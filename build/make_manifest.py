# -*- coding: utf-8 -*-
"""cover_manifest.json (기본 스킬 18-16) — 표지 현황판(ahnboat_lab_cover_status)이 읽는 그림·온톨로지·언어 목록."""
import json, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
doc = open(os.path.join(ROOT, "docs/COVER_PROMPTS_pixel.md")).read()
blocks = re.findall(r"```\n(.*?)```", doc, re.S)
covers = [b.strip().replace("\n", " ") for b in blocks[:3]]
items = []
for i in range(3):
    cid = f"cover_part{i+1}"; path = f"assets/cover/cover_part{i+1}.webp"
    if os.path.exists(os.path.join(ROOT, path)):
        items.append(dict(id=cid, role="cover", path=path, size=[1600, 900], characters=["doc", "asst", "fly", "jupanbot"], robot="jupanbot-v2", prompt_en=covers[i], source_of=None, status="ok"))
    items.append(dict(id=f"og_part{i+1}", role="og", path=f"assets/og/og_part{i+1}.jpg", size=[1200, 630], characters=[], robot="none", prompt_en=covers[i], source_of=cid if os.path.exists(os.path.join(ROOT, path)) else None, status="ok" if os.path.exists(os.path.join(ROOT, path)) else "redraw"))
for n in range(17):
    path = f"assets/scenes/scene_{n:02d}.webp"
    if os.path.exists(os.path.join(ROOT, path)):
        items.append(dict(id=f"scene_{n:02d}", role="scene", path=path, size=[1200, 800], characters=[], robot="jupanbot-v2", prompt_en=None, source_of=None, status="ok"))
m = dict(series_ko="인공지능을 위한 수학", title_ko="인공지능을 위한 수학 — 공식 12장이 모델 하나가 되기까지",
         site_url="https://adminmrobo.github.io/math_for_ai_lab/", site_title="인공지능을 위한 수학 1부 — 숫자로 담고, 한 번에 풀기",
         ontology=dict(pages=[dict(path=p, kg=True, export=True) for p in ("index.html", "part2.html", "part3.html")], files=[]),
         i18n=dict(langs=["ko"], pages=dict(ko=4), readme_langs=["ko"]), languages=["ko"], items=items, updated="2026-11-22")
json.dump(m, open(os.path.join(ROOT, "cover_manifest.json"), "w"), ensure_ascii=False, indent=2)
print("manifest", len(items), "items")
