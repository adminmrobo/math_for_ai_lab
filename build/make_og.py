# -*- coding: utf-8 -*-
"""공유 미리보기(og:image) 1200×630 — 표지 그림(assets/cover/cover_partN.webp)이 있으면 그 가운데를 잘라 쓰고, 없으면 임시판을 그린다."""
import os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
def font(sz): return ImageFont.truetype(F, sz, index=1)
ITEMS = [('og_part1.jpg', '인공지능을 위한 수학 · 1부', '숫자로 담고, 한 번에 풀기 (0~5장)', ['sia_e19', 'haru_e20']),
         ('og_part2.jpg', '인공지능을 위한 수학 · 2부', '데이터를 읽고, 불확실성을 말하기 (6~12장)', ['moa_e09', 'jupanbot_e16']),
         ('og_part3.jpg', '인공지능을 위한 수학 · 3부', '조금씩 고치며 배우기 (13~16장)', ['haru_e19', 'moa_e16'])]
for k, (fn, t, sub, ch) in enumerate(ITEMS, 1):
    cov = os.path.join(ROOT, f'assets/cover/cover_part{k}.webp')
    if os.path.exists(cov):
        c = Image.open(cov).convert('RGB').resize((1200, 675), Image.LANCZOS)
        c.crop((0, 22, 1200, 652)).save(os.path.join(ROOT, 'assets/og', fn), quality=86); continue
    W, H = 1200, 630; im = Image.new('RGB', (W, H), 'white'); d = ImageDraw.Draw(im)
    for x in range(0, W, 60): d.line([(x, 0), (x, H)], fill='#e3eaf1')
    for y in range(0, H, 60): d.line([(0, y), (W, y)], fill='#e3eaf1')
    pts = [(80 + i * 10, 520 - 300 * (((i * 10) / 1040 - 0.55) ** 2) * 3) for i in range(105)]
    d.line(pts, fill='#0f8f84', width=6); d.ellipse([620, 470, 650, 500], fill='#e8731a')
    d.rounded_rectangle([90, 90, 840, 320], radius=18, fill='white', outline='#d5dbe2', width=2)
    d.text((120, 115), t, font=font(46), fill='#16212b'); d.text((120, 195), sub, font=font(30), fill='#0f8f84')
    d.text((120, 260), '생선 가게 AI 모델 하나로 공식 12장 + 보강 3장 · 글 안상선', font=font(21), fill='#5b6874')
    for i, c in enumerate(ch):
        cim = Image.open(os.path.join(ROOT, f'assets/chars/{c}.webp')).convert('RGBA').resize((230, 230), Image.LANCZOS)
        im.paste(cim, (700 + i * 240, 380), cim)
    im.save(os.path.join(ROOT, 'assets/og', fn), quality=82)
print('og done')
