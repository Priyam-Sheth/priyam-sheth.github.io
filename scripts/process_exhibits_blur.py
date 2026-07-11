"""Film-era exhibit processing — gaussian-blur redactions (no bars, ever).
Re-processed from ORIGINALS. Same sensitive-region inventory as the audited
first pass: admin emails, dealer/tier prices. Output → assets/processed2/.
"""
from PIL import Image, ImageFilter
from pathlib import Path

ROOT = Path(r"C:\Users\priya\portfolio\assets")
OUT = ROOT / "processed2"
OUT.mkdir(exist_ok=True)

BLUR = ImageFilter.GaussianBlur(18)

def blur_region(img, box):
    region = img.crop(box).filter(BLUR)
    img.paste(region, box)

def save(img, name, max_w=1400):
    if img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    img.save(OUT / f"{name}.webp", "WEBP", quality=80, method=6)
    print(f"{name}.webp  {img.width}x{img.height}  {(OUT/f'{name}.webp').stat().st_size//1024} KB")

we = ROOT / "wolf-eyes"
pk = ROOT / "palak-os"

# 1. Login — clean
save(Image.open(we / "15-login-desktop.png").convert("RGB"), "we-login")

# 2. Admin dashboard — blur header email
img = Image.open(we / "01-admin-dashboard-desktop.png").convert("RGB")
blur_region(img, (2450, 48, 2800, 92))
save(img, "we-admin-dashboard")

# 3. Order detail — blur email + tier prices + total
img = Image.open(we / "04-admin-order-detail-desktop.png").convert("RGB")
blur_region(img, (2450, 48, 2800, 92))
blur_region(img, (2060, 975, 2480, 1035))
blur_region(img, (2060, 1146, 2480, 1206))
blur_region(img, (2310, 1278, 2490, 1340))
save(img, "we-order-detail")

# 4. Catalogue — crop 2 rows, blur DP label+value blocks
img = Image.open(we / "11-storefront-catalogue-desktop.png").convert("RGB")
img = img.crop((0, 0, 3024, 2280))
for row_y in (1200, 2130):
    for cl in [74, 655, 1237, 1816, 2397]:
        blur_region(img, (cl + 160, row_y, cl + 380, row_y + 116))
save(img, "we-catalogue")

# 5-7. Palak crops (no sensitive regions in the keepers)
img = Image.open(pk / "Operations_center.jpeg").convert("RGB")
save(img.crop((0, 40, img.width, min(688, img.height))), "palak-operations")

img = Image.open(pk / "main_agents.jpeg").convert("RGB")
save(img.crop((0, 40, img.width, min(640, img.height))), "palak-main-agent")

img = Image.open(pk / "PM2_processes.jpeg").convert("RGB")
save(img.crop((0, 55, min(1185, img.width), min(265, img.height))), "palak-pm2")

print("\nblur pass done — verify visually before shipping")
