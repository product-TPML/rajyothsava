"""
Makes the pages to paste into the CMS: cms/index.cms.html (Prajavani) and
cms/index-en.cms.html (Deccan Herald). Each is index.html / index-en.html with its
links rewritten, following cms/hosting.json:

  scripts → the Cloudflare Pages address that serves css/ and js/ (from this repository).
  media   → each image's address in the CMS media gallery. An image not uploaded yet
            (empty address) is taken from the Cloudflare address meanwhile, and listed.

Run after any change to index.html or index-en.html, or to cms/hosting.json, from the
project folder:
    python tools/build-cms.py
Don't edit the .cms.html files by hand.
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = {"index.html": "index.cms.html", "index-en.html": "index-en.cms.html"}


def main():
    hosting = json.loads((ROOT / "cms" / "hosting.json").read_text(encoding="utf-8"))
    scripts, media = hosting["scripts"], hosting["media"]
    not_uploaded = set()

    def address(match):
        attribute, path = match.group(1), match.group(2)
        if path.startswith("assets/"):
            if path not in media:
                raise SystemExit(f"{path} is not listed in cms/hosting.json")
            if media[path]:
                return f'{attribute}="{media[path]}"'
            not_uploaded.add(path)
        return f'{attribute}="{scripts}{path}"'

    for source, target in PAGES.items():
        html = (ROOT / source).read_text(encoding="utf-8")
        html = re.sub(r'\b(href|src)="((?:css|js|assets)/[^"]+)"', address, html)
        (ROOT / "cms" / target).write_text(html, encoding="utf-8", newline="\n")
        print(f"Wrote cms/{target}")

    for path in sorted(not_uploaded):
        print(f"  not in the media gallery yet, served from Cloudflare for now: {path}")


if __name__ == "__main__":
    main()
