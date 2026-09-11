#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Monta as páginas da HQ em telas padrão 1280x1920 (2:3).
- full_page(): geração única = página inteira (cover-fit).
- faixa(): imagem com múltiplos quadros e gutters próprios, encaixada
  por contain-fit dentro de uma área-retângulo (barras pretas integram-se).
- painel(): quadro único com cover-fit numa célula.
"""
import os
from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(BASE, "img")
W, H = 1280, 1920
MARGIN = 18
GUT = 14

def cover_fit(im, w, h):
    sr, (iw, ih) = w / h, im.size
    ir = iw / ih
    if ir > sr:
        nh = ih; nw = int(ih * sr); x0 = (iw - nw) // 2; y0 = 0
    else:
        nw = iw; nh = int(iw / sr); x0 = 0; y0 = (ih - nh) // 2
    return im.crop((x0, y0, x0 + nw, y0 + nh)).resize((w, h), Image.LANCZOS)

def contain_fit(im, w, h):
    ir = im.size[0] / im.size[1]; sr = w / h
    if ir > sr:
        nw = w; nh = int(w / ir)
    else:
        nh = h; nw = int(h * ir)
    return im.resize((nw, nh), Image.LANCZOS), (x := (w-nw)//2), (y := (h-nh)//2)

def full_page(src, dst):
    canvas = Image.new("RGB", (W, H), (0, 0, 0))
    p = os.path.join(IMG, src)
    if not os.path.exists(p):
        print("  FALTA:", src); canvas.save(os.path.join(IMG, dst), quality=90); return
    canvas.paste(cover_fit(Image.open(p).convert("RGB"), W, H), (0, 0))
    canvas.save(os.path.join(IMG, dst), quality=92)
    print("full ->", dst)

def montar(pecas, dst):
    """pecas: lista de ('painel'|'faixa', arquivo, [x,y,w,h])"""
    canvas = Image.new("RGB", (W, H), (8, 8, 10))
    for tipo, f, (x, y, w, h) in pecas:
        p = os.path.join(IMG, f)
        if not os.path.exists(p):
            print("  FALTA:", f); continue
        im = Image.open(p).convert("RGB")
        if tipo == "painel":
            canvas.paste(cover_fit(im, w, h), (x, y))
        else:
            cel, ox, oy = contain_fit(im, w, h)
            canvas.paste(cel, (x + ox, y + oy))
    canvas.save(os.path.join(IMG, dst), quality=92)
    print("page ->", dst)

# ---- PÁGINA 2 (duas faixas: 3 quadros cada) ----
p2 = [
    ("faixa", "p02a.jpg", [MARGIN, MARGIN, W-2*MARGIN, 1174]),
    ("faixa", "p02b.jpg", [MARGIN, 1206, W-2*MARGIN, 696]),
]
# ---- PÁGINA 3 ----
p3 = [
    ("painel", "p03_1.jpg", [MARGIN, MARGIN, 744, 660]),                # desaba
    ("painel", "p03_2.jpg", [776, MARGIN, 486, 1274]),                  # vertical ameaça
    ("painel", "p03_abc.jpg", [MARGIN, 692, 744, 600]),                 # 3 flechas
    ("painel", "p03_de.jpg",  [MARGIN, 1306, W-2*MARGIN, 596]),         # dissolve + revelação
]

if __name__ == "__main__":
    full_page("p01.jpg", "page01.jpg")
    montar(p2, "page02.jpg")
    montar(p3, "page03.jpg")
    for n in range(4, 11):
        f = f"p{n:02d}_full.jpg"
        if os.path.exists(os.path.join(IMG, f)):
            full_page(f, f"page{n:02d}.jpg")
    print("ok")
