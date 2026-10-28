"""
Serves the site on this computer with the live prajavani.net collections, for testing.

Browsers let only pages on www.prajavani.net read its collections, so opened anywhere
else the carousel falls back to SLIDES and the photo stories are left out. This server
passes collection requests on to prajavani.net from the same address as the page, so
the browser allows them. The site's own files are not changed: only the copy of
js/data.js it sends points the collections at this server.

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


class PreviewHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith(COLLECTIONS_PATH):
            self.proxy_collection()
        elif self.path.split("?")[0] == "/js/data.js":
            self.send_data_file()
        else:
            super().do_GET()

    def proxy_collection(self):
        request = urllib.request.Request(UPSTREAM + self.path, headers={"User-Agent": "Mozilla/5.0"})
        try:
            with urllib.request.urlopen(request, timeout=10) as response:
                self.send_body(response.status, response.read(), "application/json")
        except urllib.error.HTTPError as error:
            self.send_body(error.code, error.read(), "application/json")
        except urllib.error.URLError as error:
            self.send_error(502, f"prajavani.net could not be reached: {error.reason}")

    def send_data_file(self):
        text = (ROOT / "js" / "data.js").read_text(encoding="utf-8")
        text = text.replace(UPSTREAM + COLLECTIONS_PATH, COLLECTIONS_PATH)
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
