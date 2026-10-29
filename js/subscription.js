/* Subscriber check, through the newspaper's own login and subscriptions.
 *
 * Both papers log readers in through one service (web.tpml.in), which leaves two cookies for
 * the whole site (st-access-token, st-refresh-token). A page served from the newspaper's own
 * site (a CMS page, on the live site or a sandbox listed in SITES) can read them and call the site's own routes, so it can
 * run the same check as the newspaper's header: the site gives an AccessType pass for the
 * logged-in reader, and AccessType lists their subscriptions. Taken from the Dasara site, where
 * it was checked live on 29 October 2026 (api docs/LOGIN_AND_SUBSCRIBE_HANDOVER.md).
 *
 * It runs in the browser, so what it guards is a soft lock: the content itself stays public.
 * Anywhere else (Vercel, Cloudflare Pages, localhost) the cookies can't be read; there the page
 * chooses the answer itself (`Subscription.live` is false).
 */
const Subscription = (() => {
  // Where the check can run: the live sites first (one per edition), then the newspapers' test
  // sandboxes, which use the test login (web-dev.tpml.in) and their own AccessType keys. Each
  // key is the one the site itself loads (checked 29 Oct 2026); the live keys in the main
  // sites' repos are wrong (DH's answers 404, PV's is a placeholder). If a site changes its
  // key, everyone there reads as a non-subscriber: update it here.
  const PV = { brand: "pv", passRoute: "/auth/accesstype-pv-token" };
  const DH = { brand: "dh", passRoute: "/auth/accesstype-dh-token" };
  const SITES = [
    { ...PV, host: "www.prajavani.net", sso: "https://web.tpml.in", accessTypeKey: "vMyvRVh97dcV4nDspcBBXyKq" },
    { ...DH, host: "www.deccanherald.com", sso: "https://web.tpml.in", accessTypeKey: "WVXWA5UYqHx2oGx3CZDBVeHa" },
    { ...PV, host: "prajavani-sandbox-web.quintype.io", sso: "https://web-dev.tpml.in", accessTypeKey: "dr9394kutfXvSAuHxynXv4RQ" },
    { ...PV, host: "prajavani-training-web.quintype.io", sso: "https://web-dev.tpml.in", accessTypeKey: "dr9394kutfXvSAuHxynXv4RQ" },
    { ...DH, host: "dh-sandbox-web.quintype.io", sso: "https://web-dev.tpml.in", accessTypeKey: "nBX5K3Z2JAaFD5As78im28dh" }
  ];
  const brand = document.documentElement.dataset.brand === "dh" ? "dh" : "pv";
  const forBrand = SITES.filter(s => s.brand === brand);
  // Elsewhere (Vercel, Cloudflare Pages, localhost) the edition's live site stands in for the links.
  const site = forBrand.find(s => s.host === location.hostname) || forBrand[0];
  const live = location.hostname === site.host;
  // Off the live site, Subscribe and Log in still lead to the newspaper's own pages.
  const returnUrl = live ? location.origin + location.pathname : `https://${site.host}/`;

  // Analytics: pushes to the newspaper's tag setup when the page has one.
  function track(event, detail = {}) {
    try { window.dataLayer && window.dataLayer.push({ event, ...detail }); } catch (e) { /* never break the page */ }
  }

  function readCookie(name) {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : "";
  }
  function tokenExpiry(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      return payload.exp ? new Date(payload.exp * 1000) : null;
    } catch (e) { return null; }
  }
  // Same cookies and storage as the main site's addTokensToLocalStorage, so its pages see the login too.
  function saveLogin(access, refresh) {
    const domain = location.hostname.replace(/^www\./, "");
    const write = (name, value) => {
      const expiry = tokenExpiry(value);
      document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Domain=.${domain}; Secure; SameSite=Lax`
        + (expiry ? `; Expires=${expiry.toUTCString()}` : "");
    };
    write("st-access-token", access);
    write("st-refresh-token", refresh);
    document.cookie = `qt-auth=${encodeURIComponent(access)}; Path=/; Secure; SameSite=Lax`;
    try {
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
    } catch (e) { /* storage blocked: the cookies are enough */ }
  }
  // Back from the login screen: save the tokens and take them out of the address, so they are never
  // shared or kept in the history. The login service may add a second "?", so each "?" is read as "&".
  function takeLoginFromAddress() {
    const params = new URLSearchParams(location.search.replace(/\?/g, "&").slice(1));
    const access = (params.get("access_token") || "").replace(/ /g, "+");
    const refresh = (params.get("refresh_token") || "").replace(/ /g, "+");
    if (!access || !refresh) return;
    saveLogin(access, refresh);
    history.replaceState(null, "", location.pathname + location.hash);
  }

  function accessToken() {
    try { return readCookie("st-access-token") || localStorage.getItem("access_token") || ""; } catch (e) { return readCookie("st-access-token"); }
  }
  // The site's /refresh-token swaps the refresh token for new tokens, as the main site does when one expires.
  async function refreshLogin() {
    const response = await fetch("/refresh-token", { method: "POST", headers: { Authorization: `Bearer ${readCookie("st-refresh-token")}` } });
    if (!response.ok) throw new Error(`/refresh-token ${response.status}`);
    const tokens = await response.json();
    if (!tokens["st-access-token"] || !tokens["st-refresh-token"]) throw new Error("/refresh-token returned no tokens");
    saveLogin(tokens["st-access-token"], tokens["st-refresh-token"]);
  }
  // Calls one of the site's routes with the reader's token, refreshing the login once if it has expired.
  async function withLogin(request) {
    let response = await request(accessToken());
    if (response.status === 401) {
      await refreshLogin();
      response = await request(accessToken());
    }
    if (!response.ok) throw new Error(`${response.url} ${response.status}`);
    return response;
  }
  function loadAccessType() {
    if (window.AccessType) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://www.accesstype.com/frontend/v2/accesstype.js?key=${site.accessTypeKey}`;
      script.async = true;
      script.onload = () => (window.AccessType ? resolve() : reject(new Error("AccessType did not load")));
      script.onerror = () => reject(new Error("AccessType script failed"));
      document.body.append(script);
    });
  }
  // Active, or cancelled but paid up until a date still ahead (the DH site's rule).
  function subscriptionActive(sub) {
    const status = String((sub && sub.status) || "").toLowerCase();
    if (status === "active") return true;
    if (status !== "cancelled" && !(sub && sub.cancelled === true)) return false;
    const end = sub.end_timestamp || sub.end_date || sub.previous_end_timestamp;
    return Boolean(end) && new Date(end).getTime() > Date.now();
  }
  async function checkSubscriber() {
    const details = await (await withLogin(token => fetch(`/get-user-details?timestamp=${Date.now()}`, { headers: { Authorization: `Bearer ${token}` } }))).json();
    const user = (details && details.userData) || details || {};
    const passResponse = await withLogin(token => fetch(site.passRoute, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }));
    const pass = await passResponse.json().catch(() => ({}));
    const jwt = String(pass.token || pass.jwt || pass.accesstypeJwt || pass.accessTypeToken
      || passResponse.headers.get("x-integration-token") || passResponse.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    if (!jwt) throw new Error("No AccessType token");
    await loadAccessType();
    await window.AccessType.setUser({
      emailAddress: (user.emails && user.emails[0]) || user.email || "",
      mobileNumber: (user.phoneNumbers && user.phoneNumbers[0]) || user.phone || "",
      accesstypeJwt: jwt
    });
    // AccessType answers 404 for a reader who has never subscribed: like the sites' headers, an error
    // here means no subscriptions (the login and the pass above already worked).
    const result = await window.AccessType.getSubscriptions().catch(() => []);
    const subscriptions = Array.isArray(result) ? result : (result && result.subscriptions) || [];
    return subscriptions.some(subscriptionActive);
  }

  // "subscriber", "not-subscriber", "logged-out" or "error". One check per page view; a failed one is retried.
  let check = null;
  function status() {
    if (!readCookie("st-refresh-token")) return Promise.resolve("logged-out");
    check = check || checkSubscriber()
      .then(active => (active ? "subscriber" : "not-subscriber"))
      .catch(error => {
        console.warn("Subscriber check failed:", error);
        check = null;
        return "error";
      });
    return check;
  }

  // No # or query in the return address: the tokens must come back in the query.
  const loginUrl = () => `${site.sso}/auth?redirectUrl=${encodeURIComponent(returnUrl)}`;
  // medium names the place the reader subscribed from, as the DH header's utm_source=top-nav does.
  const subscribeUrl = medium => `https://${site.host}/subscribe?utm_source=karunadotsava&utm_medium=${medium}`
    + `&utm_campaign=subscribe&redirect_url=${encodeURIComponent(live ? location.pathname : "/")}`;
  function trackLoginStart(source) {
    track("SSO_Page_Open");
    try { sessionStorage.setItem("sso_login_initiated_source", source); } catch (e) { /* storage blocked */ }
  }

  if (live) {
    takeLoginFromAddress();
    status(); // start early, so the answer is ready when the reader needs it
  }
  return { live, status, loginUrl, subscribeUrl, trackLoginStart, track };
})();
