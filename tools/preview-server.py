"""
Serves the site on this computer with the live collections and video list, for testing.

Both data files ask for their collections at a relative address, /api/v1/collections/<slug>,
which on prajavani.net and deccanherald.com is each site's own API. Here this server answers
it instead, passing each request on to the right site: DH's collections (the slugs in
COLLECTIONS in js/data-en.js) to deccanherald.com, all others to prajavani.net. vercel.json
does the same on the test site.

The video list (VIDEO_FEED, /pages/karunadothsava-json) comes from the CMS page on
prajavani.net once it has links in it; until then, from cms/karunadothsava-json.json.

For testing only; the live site needs no server of its own.

Run from the project folder, then open http://localhost:8123/ (Kannada) or
http://localhost:8123/index-en.html (English).
    python tools/preview-server.py
"""

import http.server
import re
import urllib.error
import urllib.request
from functools import partial
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PORT = 8123
PV = "https://www.prajavani.net"
DH = "https://www.deccanherald.com"
COLLECTIONS_PATH = "/api/v1/collections/"
VIDEO_FEED_PATH = "/pages/karunadothsava-json"
VIDEO_FEED_FILE = ROOT / "cms" / "karunadothsava-json.json"


def dh_slugs():
    """The collection slugs in js/data-en.js's COLLECTIONS (read each time, so edits apply)."""
    text = (ROOT / "js" / "data-en.js").read_text(encoding="utf-8")
    block = text[text.index("const COLLECTIONS = {"):]
    block = block[: block.index("};")]
    return set(re.findall(r'^\s*\w+: "([a-z0-9-]+)"', block, re.M))


class PreviewHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split("?")[0]
        if path.startswith(COLLECTIONS_PATH):
            slug = path[len(COLLECTIONS_PATH):]
            self.proxy((DH if slug in dh_slugs() else PV) + self.path)
        elif path == VIDEO_FEED_PATH:
            self.send_video_feed()
        else:
            super().do_GET()

    def proxy(self, url):
        request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        try:
            with urllib.request.urlopen(request, timeout=10) as response:
                self.send_body(response.status, response.read(), "application/json")
        except urllib.error.HTTPError as error:
            self.send_body(error.code, error.read(), "application/json")
        except urllib.error.URLError as error:
            self.send_error(502, f"{url} could not be reached: {error.reason}")

    def send_video_feed(self):
        request = urllib.request.Request(PV + VIDEO_FEED_PATH, headers={"User-Agent": "Mozilla/5.0"})
        try:
            with urllib.request.urlopen(request, timeout=10) as response:
                body = response.read()
        except (urllib.error.HTTPError, urllib.error.URLError):
            body = b""
        if b'"videos"' not in body:  # the CMS page is still empty
            body = VIDEO_FEED_FILE.read_bytes()
        self.send_body(200, body, "application/json")

    def send_body(self, status, body, content_type):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    # Always send fresh files, so edits show on a plain reload.
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    handler = partial(PreviewHandler, directory=str(ROOT))
    with http.server.ThreadingHTTPServer(("localhost", PORT), handler) as server:
        print(f"Preview at http://localhost:{PORT}/ (Ctrl+C to stop)")
        server.serve_forever()
