"""SVG drafting audit — permanent Stage 4 check for all FIGs.
Rules enforced:
  R1  No two text elements may overlap (estimated bounding boxes).
  R2  No flow/rule line segment may cross a text bounding box (2px pad).
  R3  Any text with data-max-x must end before that x (cell budgets).
  R4  Every text must end inside the sheet frame (x <= 1168).
Text width estimation is reliable because ALL fig text is monospace:
  width = chars * (font_size * 0.63 + letter_spacing)
Usage: python svg_overlap_audit.py <file.svg> [...]
Exit 1 if any violation. Run on every FIG before it ships.
"""
import re, sys
import xml.etree.ElementTree as ET

NS = {"svg": "http://www.w3.org/2000/svg"}

# class -> (font_size, letter_spacing) — keep in sync with fig <style>
CLASS_FONTS = {
    "t-title": (15, 0.4), "t-sub": (11.5, 0.3), "t-band": (10, 2.2),
    "t-tag": (11, 0.5), "t-tag-red": (11, 0.5),
    "t-block": (10, 0.6), "t-block-h": (10.5, 0.4),
    "rupee": (16, 0.5),
}
LINE_CLASSES = {"flow", "flow-red", "band-rule"}
SHEET_RIGHT = 1168
WIDTH_FACTOR = 0.63
PAD = 2

def text_bbox(el):
    cls = el.get("class", "")
    fs, ls = CLASS_FONTS.get(cls, (11, 0.5))
    x, y = float(el.get("x")), float(el.get("y"))
    content = "".join(el.itertext())
    w = len(content) * (fs * WIDTH_FACTOR + ls)
    return (x, y - fs, x + w, y + fs * 0.28, content[:40], cls)

def path_segments(d):
    toks = re.findall(r"([MHVLmhvl])\s*([-\d.,\s]*)", d)
    segs, cx, cy = [], 0.0, 0.0
    for cmd, args in toks:
        nums = [float(n) for n in re.findall(r"-?\d+\.?\d*", args)]
        if cmd == "M": cx, cy = nums[0], nums[1]
        elif cmd == "H":
            for nx in nums: segs.append((cx, cy, nx, cy)); cx = nx
        elif cmd == "V":
            for ny in nums: segs.append((cx, cy, cx, ny)); cy = ny
        elif cmd == "L":
            for i in range(0, len(nums), 2):
                segs.append((cx, cy, nums[i], nums[i+1])); cx, cy = nums[i], nums[i+1]
    return segs

def seg_hits_box(seg, box):
    x1, y1, x2, y2 = seg
    bx1, by1, bx2, by2 = box[0]-PAD, box[1]-PAD, box[2]+PAD, box[3]+PAD
    if x1 == x2:  # vertical
        return bx1 <= x1 <= bx2 and max(min(y1,y2), by1) < min(max(y1,y2), by2)
    if y1 == y2:  # horizontal
        return by1 <= y1 <= by2 and max(min(x1,x2), bx1) < min(max(x1,x2), bx2)
    return False

def boxes_overlap(a, b):
    return a[0] < b[2] and b[0] < a[2] and a[1] < b[3] and b[1] < a[3]

def audit(path):
    tree = ET.parse(path)
    root = tree.getroot()
    texts, segs, fails = [], [], []
    for el in root.iter():
        tag = el.tag.split("}")[-1]
        if tag == "text":
            texts.append((text_bbox(el), el))
        elif tag == "path" and el.get("class") in LINE_CLASSES:
            segs.extend(path_segments(el.get("d", "")))
        elif tag == "line" and el.get("class") in LINE_CLASSES:
            segs.append(tuple(float(el.get(k)) for k in ("x1", "y1", "x2", "y2")))
    for i in range(len(texts)):           # R1
        for j in range(i + 1, len(texts)):
            if boxes_overlap(texts[i][0], texts[j][0]):
                fails.append(f"R1 text/text: '{texts[i][0][4]}' x '{texts[j][0][4]}'")
    for box, el in texts:                  # R2
        for s in segs:
            if seg_hits_box(s, box):
                fails.append(f"R2 line-through-text: '{box[4]}' seg {s}")
    for box, el in texts:                  # R3 + R4
        mx = el.get("data-max-x")
        if mx and box[2] > float(mx):
            fails.append(f"R3 cell-budget: '{box[4]}' ends {box[2]:.0f} > {mx}")
        if box[2] > SHEET_RIGHT:
            fails.append(f"R4 off-sheet: '{box[4]}' ends {box[2]:.0f}")
    return fails

if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    bad = False
    for f in sys.argv[1:]:
        fails = audit(f)
        print(f"{f}: {'CLEAN' if not fails else f'{len(fails)} VIOLATION(S)'}")
        for v in fails: print("   ", v); bad = True
    sys.exit(1 if bad else 0)
