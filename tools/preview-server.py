"""
Serves the site on this computer with the live prajavani.net collections, for testing.

Browsers let only pages on www.prajavani.net (and www.deccanherald.com) read their
collections, so opened anywhere else the story sections show their "coming soon" note.
This server passes collection requests on to each site from the same address as the
page, so the browser allows them. The site's own files are not changed: only the copies
of js/data.js and js/data-en.js it sends point the collections at this server.

The video list (VIDEO_FEED, /pages/karunadothsava-json) comes from the CMS page on
prajavani.net once it has links in it; until then, from cms/karunadothsava-json.json.

For testing only; the live site needs no server of its own.

Run from the project folder, then open http://localhost:8123/
    python tools/preview-server.py
"""

import http.server
import urllib.error
import urllib.request
from functools import partial
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PORT = 8123
UPSTREAM = "https://www.prajavani.net"
COLLECTIONS_PATH = "/api/v1/collections/"
# The English edition's collections, from deccanherald.com, under their own local path.
DH_UPSTREAM = "https://www.deccanherald.com"
DH_COLLECTIONS_PATH = "/dh/api/v1/collections/"
VIDEO_FEED_PATH = "/pages/karunadothsava-json"
VIDEO_FEED_FILE = ROOT / "cms" / "karunadothsava-json.json"


class PreviewHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith(COLLECTIONS_PATH):
            self.proxy_collection(UPSTREAM + self.path)
        elif self.path.startswith(DH_COLLECTIONS_PATH):
            self.proxy_collection(DH_UPSTREAM + self.path[len("/dh"):])
        elif self.path.split("?")[0] == VIDEO_FEED_PATH:
            self.send_video_feed()
        elif self.path.split("?")[0] == "/js/data.js":
            self.send_data_file("data.js", UPSTREAM + COLLECTIONS_PATH, COLLECTIONS_PATH)
        elif self.path.split("?")[0] == "/js/data-en.js":
            self.send_data_file("data-en.js", DH_UPSTREAM + COLLECTIONS_PATH, DH_COLLECTIONS_PATH)
        else:
            super().do_GET()

    def proxy_collection(self, url):
        request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        try:
            with urllib.request.urlopen(request, timeout=10) as response:
                self.send_body(response.status, response.read(), "application/json")
        except urllib.error.HTTPError as error:
            self.send_body(error.code, error.read(), "application/json")
        except urllib.error.URLError as error:
            self.send_error(502, f"{url} could not be reached: {error.reason}")

    def send_video_feed(self):
        request = urllib.request.Request(UPSTREAM + VIDEO_FEED_PATH, headers={"User-Agent": "Mozilla/5.0"})
        try:
            with urllib.request.urlopen(request, timeout=10) as response:
                body = response.read()
        except (urllib.error.HTTPError, urllib.error.URLError):
            body = b""
        if b'"videos"' not in body:  # the CMS page is still empty
            body = VIDEO_FEED_FILE.read_bytes()
        self.send_body(200, body, "application/json")

    def send_data_file(self, name, live_api, local_api):
        text = (ROOT / "js" / name).read_text(encoding="utf-8")
        text = text.replace(live_api, local_api)
        self.send_body(200, text.encode("utf-8"), "text/javascript; charset=utf-8")

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
