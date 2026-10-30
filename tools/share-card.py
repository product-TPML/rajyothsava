"""
Makes assets/social/share-pv.jpg and share-dh.jpg: the 1200 x 630 picture that search
engines and social apps (WhatsApp, Facebook, X) show for a link to each page. Each is
that edition's Karunadotsava mark on the site's red, with a yellow rule along the foot.
Run it again if the mark or the colours change, then upload the files to the media gallery.

Run from the project folder (needs Python with Pillow: pip install pillow):
    python tools/share-card.py
"""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
WIDTH, HEIGHT = 1200, 630
RED, YELLOW = "#A80F22", "#F6C744"  # --red and --yellow in css/styles.css
RULE = 12
MARK_WIDTH = 900
EDITIONS = {"pv": "karunadotsava-pv-720.webp", "dh": "karunadotsava-dh-720.webp"}


def main():
    out_dir = ROOT / "assets" / "social"
    out_dir.mkdir(exist_ok=True)
    for edition, mark_file in EDITIONS.items():
        mark = Image.open(ROOT / "assets" / "hero" / mark_file).convert("RGBA")
        mark = mark.resize((MARK_WIDTH, round(mark.height * MARK_WIDTH / mark.width)), Image.LANCZOS)
        card = Image.new("RGB", (WIDTH, HEIGHT), RED)
        card.paste(mark, ((WIDTH - mark.width) // 2, (HEIGHT - RULE - mark.height) // 2), mark)
        ImageDraw.Draw(card).rectangle((0, HEIGHT - RULE, WIDTH, HEIGHT), fill=YELLOW)
        out = out_dir / f"share-{edition}.jpg"
        card.save(out, quality=88, optimize=True, progressive=True)
        print(f"Wrote {out.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
