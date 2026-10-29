"""
Makes the pages to paste into the CMS: cms/index.cms.html (Prajavani),
cms/index-en.cms.html (Deccan Herald) and cms/exhibition-road.cms.html (the exhibition
road test, Prajavani). Each is its page with every css/, js/ and assets/ path rewritten,
whether in an attribute, a CSS url() or a script string, following cms/hosting.json:

  scripts → the Cloudflare Pages address that serves css/ and js/ (from this repository).
  media   → each image's address in the CMS media gallery. An image not uploaded yet
            (empty address) is taken from the Cloudflare address meanwhile, and listed.

Run after any change to one of those pages, or to cms/hosting.json, from the
project folder:
    python tools/build-cms.py
Don't edit the .cms.html files by hand.
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = {
    "index.html": "index.cms.html",
    "index-en.html": "index-en.cms.html",
    "exhibition-road.html": "exhibition-road.cms.html",
}
# A path, right after the quote or "url(" that opens it.
PATH = re.compile(r"""(["'(])((?:css|js|assets)/[^"')\s]+)""")


def main():
    hosting = json.loads((ROOT / "cms" / "hosting.json").read_text(encoding="utf-8"))
    scripts, media = hosting["scripts"], hosting["media"]
    not_uploaded = set()

    def address(match):
        opening, path = match.group(1), match.group(2)
        if path.startswith("assets/"):
            if path not in media:
                raise SystemExit(f"{path} is not listed in cms/hosting.json")
            if media[path]:
                return f"{opening}{media[path]}"
            not_uploaded.add(path)
        return f"{opening}{scripts}{path}"

    for source, target in PAGES.items():
        html = PATH.sub(address, (ROOT / source).read_text(encoding="utf-8"))
        (ROOT / "cms" / target).write_text(html, encoding="utf-8", newline="\n")
        print(f"Wrote cms/{target}")

    for path in sorted(not_uploaded):
        print(f"  not in the media gallery yet, served from Cloudflare for now: {path}")


if __name__ == "__main__":
    main()
