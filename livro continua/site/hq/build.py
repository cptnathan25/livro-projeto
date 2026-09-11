#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Monta as páginas da HQ em telas padrão 1280x1920 (2:3).
- Páginas full-page (uma geração = página inteira): redimensiona com crop central.
- Páginas de ação: painéis gerados individualmente são recortados no aspect das
  células e colados sobre tela preta com molduras/gutters uniformes.
"""
import os, json
from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(BASE, "img")
W, H = 1280, 1920
MARGIN = 18
GUT = 14

def cover_fit(im, w, h):
    """Recorta (center-crop) e redimensiona a imagem para exatamente w x h."""
    sr = w / h
    iw, ih = im.size
    ir = iw / ih
    if ir > sr:
        nh = ih; nw = int(ih * sr)
        x0 = (iw - nw) // 2; y0 = 0
    else:
        nw = iw; nh = int(iw / sr)
        x0 = 0; y0 = (ih - nh) // 2
    im = im.crop((x0, y0, x0 + nw, y0 + nh))
    return im.resize((w, h), Image.LANCZOS)

def full_page(src, dst):
    canvas = Image.new("RGB", (W, H), (0, 0, 0))
    im = Image.open(os.path.join(IMG, src)).convert("RGB")
    page = cover_fit(im, W, H)
    canvas.paste(page, (0, 0))
    canvas.save(os.path.join(IMG, dst), quality=92)
    print("full ->", dst, canvas.size)

def panel_page(spec, dst):
    """spec: lista de (arquivo, [x,y,w,h]) em coordenas 1280x1920."""
    canvas = Image.new("RGB", (W, H), (8, 8, 10))
    for f, (x, y, w, h) in spec:
        p = os.path.join(IMG, f)
        if not os.path.exists(p):
            print("  FALTA:", f); continue
        im = Image.open(p).convert("RGB")
        cell = cover_fit(im, w, h)
        canvas.paste(cell, (x, y))
    canvas.save(os.path.join(IMG, dst), quality=92)
    print("page ->", dst, canvas.size)

# ----------------------------------------------------------------------
# PÁGINA 2 — grade
# ----------------------------------------------------------------------
p2 = [
    ("p02_1.jpg", [MARGIN, MARGIN, W-2*MARGIN, 560]),            # wide: golem surge
    ("p02_2.jpg", [MARGIN, MARGIN+560+GUT, 744, 600]),           # esquiva
    ("p02_3.jpg", [MARGIN+744+GUT, MARGIN+560+GUT, W-2*MARGIN-744-GUT, 600]),  # soco
    ("p02_4.jpg", [MARGIN, MARGIN+560+GUT+600+GUT, 420, 340]),   # arremessado
    ("p02_5.jpg", [MARGIN+420+GUT, MARGIN+560+GUT+600+GUT, W-2*MARGIN-420-GUT, 340]),  # corre p/ fenda
    ("p02_6.jpg", [MARGIN, MARGIN+560+GUT+600+GUT+340+GUT, W-2*MARGIN, H-(MARGIN+560+GUT+600+GUT+340+GUT)-MARGIN]),  # alavanca
]

# ----------------------------------------------------------------------
# PÁGINA 3 — grade (painel do meio à direita é vertical e atravessa duas linhas)
# ----------------------------------------------------------------------
row1_y, row1_h = MARGIN, 660
row2_y = row1_y + row1_h + GUT
row2_h = 600
col_l_w = 744
col_r_x = MARGIN + col_l_w + GUT
col_r_w = W - 2*MARGIN - col_l_w - GUT
arr_w = (col_l_w - 2*GUT) // 3
row3_y = row2_y + row2_h + GUT
row3_h = H - MARGIN - row3_y
half_w = (W - 2*MARGIN - GUT) // 2
p3 = [
    ("p03_1.jpg", [MARGIN, row1_y, col_l_w, row1_h]),                 # desaba
    ("p03_2.jpg", [col_r_x, row1_y, col_r_w, row2_h + GUT + row2_h]), # vertical: ameaça
    ("p03_3.jpg", [MARGIN, row2_y, arr_w, row2_h]),                   # flecha 1
    ("p03_4.jpg", [MARGIN+arr_w+GUT, row2_y, arr_w, row2_h]),         # flecha 2
    ("p03_5.jpg", [MARGIN+2*(arr_w+GUT), row2_y, arr_w, row2_h]),     # flecha 3
    ("p03_6.jpg", [MARGIN, row3_y, half_w, row3_h]),                  # dissolve
    ("p03_7.jpg", [MARGIN+half_w+GUT, row3_y, half_w, row3_h]),       # revelação
]

if __name__ == "__main__":
    full_page("p01.jpg", "page01.jpg")
    panel_page(p2, "page02.jpg")
    panel_page(p3, "page03.jpg")
    # páginas full-page geradas depois:
    for n in (4, 5, 6, 7, 8, 9, 10):
        f = f"p{n:02d}_full.jpg"
        if os.path.exists(os.path.join(IMG, f)):
            full_page(f, f"page{n:02d}.jpg")
    # grava as células para o lettering
    cells = {"2": [[a, b] for a, b in p2], "3": [[a, b] for a, b in p3]}
    with open(os.path.join(BASE, "cells.json"), "w", encoding="utf-8") as fh:
        json.dump(cells, fh, ensure_ascii=False, indent=1)
    print("ok")
