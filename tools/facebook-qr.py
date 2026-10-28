"""
Makes assets/icons/facebook-qr.svg: the QR code beside the quotes that opens the
newspaper's Facebook page (polls and contests). Run it again if the page address
changes, with the same address as UI.contestsUrl in js/data.js.

Run from the project folder (needs Python with segno: pip install segno):
    python tools/facebook-qr.py https://www.facebook.com/prajavani.net
"""

import re
import sys
from pathlib import Path

import segno

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "icons" / "facebook-qr.svg"


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    qr = segno.make(sys.argv[1], error="m")
    size = qr.symbol_size(scale=1, border=0)[0]
    svg = qr.svg_inline(scale=1, border=0, dark="#242424", light=None, svgclass=None, lineclass=None)
    # A standalone file (xmlns) with a viewBox, so the code scales to whatever size
    # the page gives it, with sharp squares.
    svg = re.sub(r'width="\d+" height="\d+"', f'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" shape-rendering="crispEdges"', svg, count=1)
    OUT.write_text(svg + "\n", encoding="utf-8")
    print(f"Wrote {OUT.relative_to(ROOT)} ({size} x {size} modules)")


if __name__ == "__main__":
    main()
