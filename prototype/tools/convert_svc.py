import glob, os, sys
from PIL import Image, ImageDraw
src, out = sys.argv[1], sys.argv[2]
files = sorted(glob.glob(src + "/0*/*.png"))
thumbs = []
for f in files:
    im = Image.open(f).convert("RGB")
    name = os.path.basename(f)[:-4].replace("-v1", "")
    im.save(f"{out}/{name}.webp", "WEBP", quality=82, method=6)
    t = im.copy(); t.thumbnail((420, 420)); thumbs.append((name, t))
    print(name, im.size, os.path.getsize(f)//1024, "KB ->", os.path.getsize(f"{out}/{name}.webp")//1024, "KB")
rows = (len(thumbs) + 3) // 4
sheet = Image.new("RGB", (4*430, rows*440), "white"); d = ImageDraw.Draw(sheet)
for i, (n, t) in enumerate(thumbs):
    x = (i % 4) * 430; y = (i // 4) * 440
    sheet.paste(t, (x, y + 18)); d.text((x + 2, y + 2), n, fill="black")
sheet.save("shots/svc-sheet.png")
