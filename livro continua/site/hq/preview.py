#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Renderiza as páginas com balões (PIL) para verificação local do lettering.
Usa as mesmas coordenadas de data.js (espaço 1280x1920)."""
import os, re, json, math, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(BASE, "img")
OUT = os.path.join(BASE, "preview")
os.makedirs(OUT, exist_ok=True)
W, H = 1280, 1920

FDIR = "/usr/share/fonts/truetype/dejavu"
def F(size, kind="sans"):
    if kind == "serif":
        return ImageFont.truetype(f"{FDIR}/DejaVuSerif.ttf", size)
    if kind == "serifb":
        return ImageFont.truetype(f"{FDIR}/DejaVuSerif-Bold.ttf", size)
    if kind == "sfx":
        return ImageFont.truetype(f"{FDIR}/DejaVuSans-Bold.ttf", size)
    return ImageFont.truetype(f"{FDIR}/DejaVuSans-Bold.ttf", size)

def load_data():
    src = open(os.path.join(BASE, "data.js"), encoding="utf-8").read()
    # isola o array: pega tudo entre "= [" e "];"
    s = src.index("const PAGINAS")
    arr = src[s:src.index("\n];", s)+2]
    # comenta que é JS: usa node para exportar JSON (confiável)
    js = arr + "\nconsole.log(JSON.stringify(PAGINAS));"
    js = js.replace("const PAGINAS", "const PAGINAS")
    r = subprocess.run(["node","-e", js], capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[:800]); sys.exit(1)
    return json.loads(r.stdout)

def wrap(text, font, maxw):
    words = text.split(" ")
    lines, cur = [], ""
    for word in words:
        t = (cur+" "+word).strip()
        if d0.textlength(t, font=font) <= maxw or not cur:
            cur = t
        else:
            lines.append(cur); cur = word
    if cur: lines.append(cur)
    return lines

def bubble_rect(e):
    w = e.get("w", 400); fs = e.get("tamanho") or {"fala":27,"rouca":29,"grito":42,"sussurro":25,"narra":24,"sfx":48,"letreiro":46}[e["t"]]
    return w, fs

def edge_point(cx, cy, w, h, tx, ty):
    dx, dy = tx-cx, ty-cy
    if dx == 0 and dy == 0: return cx, cy+h/2
    t = 1/max(abs(dx/(w/2)), abs(dy/(h/2)))
    return cx+dx*t, cy+dy*t

def jagged_poly(box, teeth=9):
    x0,y0,x1,y1 = box
    pts=[]
    import random; random.seed(int(x0+y0))
    def side(c1,c2,n,sw):
        out=[]
        for i in range(n+1):
            a=i/n
            out.append((c1[0]+(c2[0]-c1[0])*a + (random.randint(-9,9) if 0<i<n else 0),
                        c1[1]+(c2[1]-c1[1])*a + (random.randint(-9,9) if 0<i<n else 0)))
        return out
    pts += side((x0,y0),(x1,y0),teeth,0)
    pts += side((x1,y0),(x1,y1),teeth,1)
    pts += side((x1,y1),(x0,y1),teeth,2)
    pts += side((x0,y1),(x0,y0),teeth,3)
    return pts

d0 = ImageDraw.Draw(Image.new("RGB",(10,10)))

def render(pag, idx):
    path = os.path.join(BASE, pag["img"])
    if os.path.exists(path):
        page = Image.open(path).convert("RGB")
    else:
        page = Image.new("RGB",(W,H),(24,22,28))
    canvas = page.copy()
    d = ImageDraw.Draw(canvas)
    global d0; d0 = d

    for e in pag["elementos"]:
        t = e["t"]
        w, fs = bubble_rect(e)
        syl = e.get("de")=="sylvanas"
        if t == "sfx":
            font = F(fs, "sfx")
            lines = [e["texto"]]
            tw = max(d.textlength(l, font=font) for l in lines); th = fs*1.1
            cx, cy = e["x"]+w/2, e["y"]
            # texto com contorno
            tmp = Image.new("RGBA",(int(tw+40), int(th+40)),(0,0,0,0))
            td = ImageDraw.Draw(tmp)
            td.text((20,10), e["texto"], font=font, fill=(231,236,238,255),
                    stroke_width=5, stroke_fill=(12,11,14,255))
            if e.get("rot"):
                tmp = tmp.rotate(e["rot"], resample=Image.BICUBIC, expand=True)
            canvas.paste(tmp, (int(cx-tmp.width/2), int(cy-tmp.height/2)), tmp)
            continue
        if t == "letreiro":
            font = F(fs, "sfx")
            lines = wrap(e["texto"], font, w-50)
            th = len(lines)*fs*1.12
            x0,y0 = e["x"], e["y"]; x1,y1 = e["x"]+w, e["y"]+th+28
            d.rounded_rectangle([x0,y0,x1,y1], radius=4, fill=(8,6,10,230), outline=(200,162,74), width=2)
            for i,l in enumerate(lines):
                tw=d.textlength(l,font=font)
                d.text((e["x"]+(w-tw)/2, y0+14+i*fs*1.12), l, font=font, fill=(200,162,74))
            continue

        kind = "serif" if t=="narra" else "sans"
        font = F(fs, kind)
        pad_x, pad_y = (22, 13) if t!="narra" else (24, 14)
        lines = wrap(e["texto"], font, w-2*pad_x-8)
        lh = fs*(1.42 if t=="narra" else 1.26)
        bh = len(lines)*lh + 2*pad_y
        cx = e["x"]+w/2; cy = e["y"]+bh/2
        x0,y0,x1,y1 = cx-w/2, cy-bh/2, cx+w/2, cy+bh/2

        fill = (12,10,16,235) if t=="narra" else ((243,239,246) if syl else (251,250,246))
        outline = (107,88,54) if t=="narra" else ((42,29,51) if syl else (21,19,26))

        # rabicho (atrás do balão)
        if t in ("fala","grito","rouca","sussurro") and "tx" in e:
            ex, ey = edge_point(cx, cy, w, bh, e["tx"], e["ty"])
            half = min(12, math.hypot(e["tx"]-ex,e["ty"]-ey)*0.22)
            dx,dy = e["tx"]-ex, e["ty"]-ey
            ln = math.hypot(dx,dy) or 1
            ux,uy,px,py = dx/ln,dy/ln,-dy/ln,dx/ln
            p1=(ex+px*half,ey+py*half); p2=(ex-px*half,ey-py*half)
            d.polygon([p1,(e["tx"],e["ty"]),p2], fill=fill, outline=outline)
            # engrossa a borda: repassa linha
            d.line([p1,(e["tx"],e["ty"]),p2], fill=outline, width=3, joint="curve")

        if t == "grito":
            poly = jagged_poly([x0,y0,x1,y1])
            d.polygon(poly, fill=fill, outline=outline)
            # reforça contorno
            d.line(poly+[poly[0]], fill=outline, width=3, joint="curve")
        elif t == "sussurro":
            for off in range(0,0): pass
            d.rounded_rectangle([x0,y0,x1,y1], radius=18, fill=fill, outline=outline, width=3)
        else:
            d.rounded_rectangle([x0,y0,x1,y1], radius=(4 if t=="narra" else 18),
                                fill=fill, outline=outline, width=(2 if t=="narra" else 3))
            if t=="narra":
                d.rectangle([x0,y0,x0+7,y1], fill=(200,162,74))
        tcolor = (228,220,203) if t=="narra" else ((33,19,39) if syl else (21,19,26))
        if e.get("rouca"): tcolor=(55,45,60)
        for i,l in enumerate(lines):
            tw = d.textlength(l, font=font)
            d.text((cx-tw/2, y0+pad_y+i*lh), l, font=font, fill=tcolor)

    canvas.save(os.path.join(OUT, f"preview_{idx:02d}.jpg"), quality=82)
    print("preview", idx)

if __name__ == "__main__":
    data = load_data()
    only = sys.argv[1:]
    for i, p in enumerate(data):
        if only and str(i+1) not in only: continue
        render(p, i+1)
