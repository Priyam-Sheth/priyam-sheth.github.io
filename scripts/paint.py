"""Paint the atmospheric background panels in code. No stock, no AI image credits: ours.
Each scene is a stack of soft colour fields (large blurred blobs), a slow low-frequency
"sky" gradient, a hint of brushed displacement, and fine grain. Output: assets/paint/*.webp
Usage: python scripts/paint.py
"""
import numpy as np
from PIL import Image, ImageFilter
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets" / "paint"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(7)

def hexrgb(h):
    h = h.lstrip('#'); return np.array([int(h[i:i+2], 16) for i in (0, 2, 4)], dtype=np.float32)

def field(w, h, blobs, base_top, base_bot, seed):
    r = np.random.default_rng(seed)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    t = yy / h
    img = (1 - t)[..., None] * hexrgb(base_top) + t[..., None] * hexrgb(base_bot)
    for col, (cx, cy), (rx, ry), a in blobs:
        cx *= w; cy *= h; rx *= w; ry *= h
        d = ((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2
        m = np.exp(-d * 1.6) * a
        img = img * (1 - m[..., None]) + hexrgb(col) * m[..., None]
    return img

def brush(img, seed, amount=18):
    """Displace rows by a smooth random field so gradients read as strokes, not gradients."""
    r = np.random.default_rng(seed)
    h, w, _ = img.shape
    small = r.normal(0, 1, (h // 40 + 2, w // 40 + 2)).astype(np.float32)
    disp = np.array(Image.fromarray(small).resize((w, h), Image.BICUBIC))
    disp = (disp - disp.mean()) / (disp.std() + 1e-6) * amount
    yy, xx = np.mgrid[0:h, 0:w]
    xs = np.clip((xx + disp).astype(int), 0, w - 1)
    ys = np.clip((yy + disp * 0.6).astype(int), 0, h - 1)
    return img[ys, xs]

def hills(img, layers, seed):
    """Soft rolling silhouettes: each layer is (colour, base height 0..1, amplitude, blur, alpha)."""
    r = np.random.default_rng(seed)
    h, w, _ = img.shape
    x = np.linspace(0, 1, w, dtype=np.float32)
    yy = np.mgrid[0:h, 0:w][0].astype(np.float32) / h
    for col, base, amp, bl, a in layers:
        f1, f2, f3 = r.uniform(0.6, 1.4), r.uniform(1.6, 2.6), r.uniform(3.0, 4.5)
        p1, p2, p3 = r.uniform(0, 6.28, 3)
        curve = base + amp * (0.55 * np.sin(x * f1 * 6.28 + p1) + 0.3 * np.sin(x * f2 * 6.28 + p2) + 0.15 * np.sin(x * f3 * 6.28 + p3))
        mask = (yy > curve[None, :]).astype(np.float32)
        mask = np.array(Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(bl))).astype(np.float32) / 255
        img = img * (1 - (mask * a)[..., None]) + hexrgb(col) * (mask * a)[..., None]
    return img

def streaks(img, seed, strength=7.0):
    """Horizontal brush texture: noise blurred sideways, added as luminance."""
    r = np.random.default_rng(seed)
    h, w, _ = img.shape
    n = r.normal(0, 1, (h // 3, w // 24)).astype(np.float32)
    n = np.array(Image.fromarray(n).resize((w, h), Image.BILINEAR))
    n = (n - n.mean()) / (n.std() + 1e-6) * strength
    return img + n[..., None]

def finish(img, name, grain=6.0, blur=10):
    pil = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(blur))
    arr = np.array(pil).astype(np.float32)
    g = rng.normal(0, grain, arr.shape[:2]).astype(np.float32)
    arr += g[..., None]
    out = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    out.save(OUT / f"{name}.webp", "WEBP", quality=72, method=6)
    print(name, out.size, (OUT / f"{name}.webp").stat().st_size // 1024, "KB")

W, H = 1600, 1000

# 1. Dusk over the shop: apricot sky into a cool teal-blue floor. The hero.
dusk = field(W, H, [
    ("#FFD3B0", (0.25, 0.18), (0.55, 0.32), 0.85),
    ("#F5A98E", (0.70, 0.10), (0.45, 0.26), 0.65),
    ("#E8C7E6", (0.55, 0.42), (0.60, 0.22), 0.55),
    ("#9CC9CC", (0.15, 0.78), (0.55, 0.30), 0.70),
    ("#3E8E8B", (0.75, 0.92), (0.60, 0.26), 0.75),
    ("#FFF1D6", (0.50, 0.30), (0.20, 0.10), 0.50),
], "#F7DCC7", "#6FB0AE", 11)
dusk = brush(dusk, 3, 22)
dusk = hills(dusk, [("#7FB8B5", 0.66, 0.05, 40, 0.75), ("#3E8E8B", 0.78, 0.045, 26, 0.85), ("#1F6B6A", 0.90, 0.03, 18, 0.9)], 21)
finish(streaks(dusk, 31), "dusk")

# 2. Morning gold: for "how I work" and the comparison. Pale gold, sage, a cream horizon.
gold = field(W, H, [
    ("#FFE6A8", (0.30, 0.70), (0.60, 0.30), 0.85),
    ("#F6C86B", (0.80, 0.85), (0.45, 0.22), 0.55),
    ("#CFE1B6", (0.20, 0.30), (0.50, 0.26), 0.70),
    ("#EAF0E4", (0.65, 0.22), (0.45, 0.24), 0.75),
    ("#B9D5C8", (0.90, 0.45), (0.30, 0.30), 0.45),
], "#F4F1E4", "#E9D48C", 12)
gold = brush(gold, 5, 20)
gold = hills(gold, [("#D8DDB0", 0.62, 0.05, 44, 0.7), ("#C9C67C", 0.76, 0.045, 30, 0.8), ("#E9C45E", 0.89, 0.03, 20, 0.9)], 22)
finish(streaks(gold, 32), "gold")

# 3. Night teal: the dark band for the numbers. Deep ink with a teal glow.
night = field(W, H, [
    ("#12464B", (0.30, 0.35), (0.55, 0.40), 0.80),
    ("#1F7A78", (0.75, 0.75), (0.45, 0.35), 0.55),
    ("#0B1418", (0.10, 0.90), (0.50, 0.30), 0.80),
    ("#2C3E55", (0.85, 0.15), (0.40, 0.30), 0.55),
], "#0F1C22", "#0B1418", 13)
night = brush(night, 9, 16)
night = hills(night, [("#0E2A31", 0.72, 0.05, 40, 0.8), ("#081217", 0.86, 0.035, 24, 0.9)], 23)
finish(streaks(night, 33, 4.0), "night", grain=4.5)

# 4. Rose lavender: the wall of love and the close.
rose = field(W, H, [
    ("#F7C8D0", (0.20, 0.25), (0.55, 0.32), 0.80),
    ("#D9CCF2", (0.70, 0.30), (0.50, 0.30), 0.75),
    ("#FFE3C4", (0.55, 0.85), (0.60, 0.28), 0.75),
    ("#BFD9D6", (0.05, 0.85), (0.35, 0.28), 0.55),
], "#F3E4EC", "#F8E7D2", 14)
rose = brush(rose, 4, 20)
rose = hills(rose, [("#E9C9C0", 0.64, 0.05, 44, 0.7), ("#D5B39E", 0.79, 0.04, 28, 0.75), ("#B9A98F", 0.91, 0.03, 20, 0.8)], 24)
finish(streaks(rose, 34), "rose")
