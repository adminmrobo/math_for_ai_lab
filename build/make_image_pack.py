# -*- coding: utf-8 -*-
"""그림 요청 꾸러미 zip (plain 스킬 7장): 캐릭터 기본 그림, 대화별 요청문, 저장 이름 체크리스트, 표정 참고 그림.
python3 build/make_image_pack.py <fruitfly-lab-expressions/images 경로> <출력 zip>"""
import os, re, sys, zipfile
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG, OUT = sys.argv[1], sys.argv[2]
doc = open(os.path.join(ROOT, "docs/COVER_PROMPTS_pixel.md")).read()
blocks = re.findall(r"```\n(.*?)```", doc, re.S)
covers = blocks[:3]; scene_tpl = blocks[3]
rows = re.findall(r"^\| (\d+) \| (scene_\d+) \| (.*?) \| (.*?) \|$", doc, re.M)
NAME = {"시아": "sia", "모아": "moa", "하루": "haru", "조수 하루": "haru", "박사": "doctor", "초파리": "fruitfly", "초파리 연구원": "fruitfly", "주판봇": "jupanbot", "X1": "x1"}
def refs(s):
    out = []
    for name, e in re.findall(r"(조수 하루|초파리 연구원|시아|모아|하루|박사|초파리|주판봇|X1)(?:~X3)? (E\d\d)", s):
        out.append((NAME[name], e))
    return out
def efile(who, e):
    d = os.path.join(IMG, who)
    for f in sorted(os.listdir(d)):
        if f.startswith(e + "_"): return os.path.join(d, f)
    return None
cover_refs = [re.search(r"## %d\..*?\n참고: (.*?)\n" % (i + 1), doc, re.S).group(1) for i in range(3)]
convs = [("01_cover_part1", [("cover_part1", covers[0], cover_refs[0])]),
         ("02_cover_part2_3", [("cover_part2", covers[1], cover_refs[1]), ("cover_part3", covers[2], cover_refs[2])])]
groups = [rows[0:5], rows[5:10], rows[10:14], rows[14:17]]
for gi, g in enumerate(groups):
    convs.append((f"{gi+3:02d}_scenes_{g[0][0]}-{g[-1][0]}", [(r[1], scene_tpl.replace("[아래 표의 장면 줄]", r[2]), r[3]) for r in g]))
z = zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED); seen = set()
for who in ("doctor", "haru", "fruitfly", "jupanbot", "sia", "moa"):
    z.write(os.path.join(IMG, who, "E13_neutral.png"), f"00_base_characters/{who}_E13_neutral.png")
check = ["# 저장 이름 체크리스트 — 인공지능을 위한 수학", "", "받은 그림을 아래 이름으로 저장해 저장소에 넣고 `python3 build/build.py`, `python3 build/make_manifest.py`를 실행합니다.", "", "| 대화 | 그림 | 비율 | 저장 위치 | 받음 |", "|---|---|---|---|---|"]
for cname, items in convs:
    txt = [f"# 대화 {cname}", "", "한 대화에 아래 요청을 차례로 붙여 넣습니다. 첫 요청 때 `00_base_characters`의 기본 그림과 이 폴더의 표정 그림을 함께 올립니다.",
           "1부 표지를 먼저 받아 그림체를 확인했다면, 그 표지도 참고 그림으로 함께 올립니다.", ""]
    for key, prompt, rf in items:
        txt += [f"## {key}", f"참고 표정: {rf}", "```", prompt.strip(), "```", ""]
        for who, e in refs(rf):
            f = efile(who, e)
            arc = f"{cname}/refs/{who}_{os.path.basename(f)}" if f else None
            if f and arc not in seen: seen.add(arc); z.write(f, arc)
        ratio = "16:9 → 1600×900" if key.startswith("cover") else "3:2 → 1200×800"
        place = f"assets/cover/{key}.webp" if key.startswith("cover") else f"assets/scenes/{key}.webp"
        check.append(f"| {cname} | {key} | {ratio} | `{place}` | ☐ |")
    z.writestr(f"{cname}/request.md", "\n".join(txt))
check += ["", "- WebP로 저장, 줄일 때는 '가장 가까운 이웃' 방식(픽셀 유지). 표지 220 KB, 장면 한 장 100 KB 안팎.", "- 그림 속 글자가 있으면 다시 요청합니다. 16비트 픽셀아트가 아니면(매끈한 일러스트·3D) 쓰지 않습니다.",
          "- 표지에는 박사·조수 하루·초파리 연구원·주판봇 넷이 모두 나와야 합니다.", "- 16장(scene_16)은 대결 결과(모아 승)와 표정이 맞는지 확인합니다."]
z.writestr("CHECKLIST.md", "\n".join(check))
z.writestr("README.md", "# 그림 요청 꾸러미 — 인공지능을 위한 수학\n\n- `00_base_characters/` 캐릭터 기본 그림 6장(박사·조수 하루·초파리 연구원·주판봇·시아·모아)\n- `01_…`~`06_…` 대화 하나에 폴더 하나: `request.md`(붙여 넣을 요청문)와 `refs/`(표정 참고 그림)\n- `CHECKLIST.md` 저장 이름과 위치\n\n순서: 01(1부 표지) → 그림체 확인 → 02(2·3부 표지) → 03~06(장면 그림, 3~5장씩).\n")
z.close(); print(OUT, len(convs), "conversations")
