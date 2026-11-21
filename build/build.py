# -*- coding: utf-8 -*-
"""인공지능을 위한 수학 — 페이지 빌드. python3 build/build.py 로 index.html, part2.html, part3.html을 다시 만든다."""
import json, os, html, sys
sys.path.insert(0, os.path.dirname(__file__))
import content1, content2, content3

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VER = "v1.0"
DATE = "2026-11-22"
SITE = "https://adminmrobo.github.io/math_for_ai_lab/"
REPO = "https://github.com/adminmrobo/math_for_ai_lab"
AUTHOR_URL = "https://adminmrobo.github.io/who_am_i/who_am_i.html"
E = html.escape
DATA = json.load(open(os.path.join(os.path.dirname(__file__), "data.json")))

CH = {  # key: (이름, 파일 접두, 역할)
 "sia": ("시아", "sia", "인턴(No.005) · 직관파. 먼저 해 보고 묻는다"),
 "moa": ("모아", "moa", "인턴(No.006) · 꼼꼼파. 조건과 예외를 묻는다"),
 "doctor": ("박사", "doctor", "연구실 책임자이자 친절한 선생님. 장마다 상황 질문으로 열고 해석 문장으로 닫는다"),
 "haru": ("조수 하루", "haru", "질문을 받는 사람. 공식 12장을 맡아 긴장했지만, 수식 상자에서 기호를 하나씩 풀어 준다. 대결 심판"),
 "fruitfly": ("초파리 연구원", "fruitfly", "의심 담당. \"이걸 눌러 봐\"로 실습 대시보드를 권한다"),
 "jupanbot": ("주판봇", "jupanbot", "계산 담당. 대시보드 채점을 맡지만 가끔 성급하게 확신한다"),
 "x1": ("X1", "x1", "방청객. 긴장한 하루를 걱정한다"),
 "x2": ("X2", "x2", "방청객. 도전 미션을 응원한다"),
 "x3": ("X3", "x3", "방청객. 박수 담당"),
}
COLOR = {"doctor": "doc", "haru": "asst", "fruitfly": "fly", "jupanbot": "robo", "sia": "sia", "moa": "moa", "x1": "sia", "x2": "sia", "x3": "sia"}

def face(k, e="e13", cls="", size=96):
    n, f, _ = CH[k]
    return f'<img src="assets/chars/{f}_{e}.webp" alt="{E(n)}" width="{size}" height="{size}" loading="lazy"{(" class=%s" % cls) if cls else ""}>'

PARTS = [("index.html", "1부", "숫자로 담고, 한 번에 풀기", "0~5장"),
         ("part2.html", "2부", "데이터를 읽고, 불확실성을 말하기", "6~12장"),
         ("part3.html", "3부", "조금씩 고치며 배우기", "13~16장")]

def head(title, desc, og, path):
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{E(title)}</title>
<meta name="description" content="{E(desc)}">
<meta property="og:type" content="article"><meta property="og:title" content="{E(title)}"><meta property="og:description" content="{E(desc)}">
<meta property="og:image" content="{SITE}assets/og/{og}"><meta property="og:url" content="{SITE}{path}"><meta name="twitter:card" content="summary_large_image">
<meta name="author" content="안상선">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/lab.css">
</head>
<body>
<div id="prog"></div>
"""

def nav(links):
    a = "".join(f'<a href="{h}">{E(t)}</a>' for h, t in links)
    return f'<nav class="top"><div class="row"><a class="logo" href="index.html">인공지능을 위한 <i>수학</i></a><div class="links">{a}</div></div></nav>\n'

def partbar(cur):
    return '<div class="partbar">' + "".join(
        f'<a href="{f}"{" class=cur" if f == cur else ""}><b>{p} · {E(t)}</b>{r}</a>' for f, p, t, r in PARTS) + "</div>"

def cover(cap, cast, img=None, badge="표지 그림 준비 중 (픽셀풍)"):
    imgs = "".join(face(k, e, "s" if i in (0, len(cast) - 1) and len(cast) > 3 else "") for i, (k, e) in enumerate(cast))
    grid = "".join(f'<line x1="{x}" y1="0" x2="{x}" y2="900" stroke="#dbe5ee"/>' for x in range(0, 1601, 80)) + \
           "".join(f'<line x1="0" y1="{y}" x2="1600" y2="{y}" stroke="#dbe5ee"/>' for y in range(0, 901, 80))
    deco = ('<path d="M120 700 C 400 300, 700 820, 1000 420 S 1400 180, 1500 260" fill="none" stroke="#0f8f84" stroke-width="6"/>'
            '<g font-family="Cambria Math,serif" font-style="italic" fill="#1e2f6e" font-size="54" opacity=".55">'
            '<text x="140" y="190">f(x)</text><text x="420" y="140">Aᵀ</text><text x="700" y="210">∇f</text><text x="1000" y="140">P(A|B)</text><text x="1300" y="210">σ²</text></g>'
            '<circle cx="1000" cy="420" r="18" fill="#e8731a"/>')
    art = f'<img class="art" src="{img}" alt="">' if img else ""
    return f"""<div class="cover"><div class="frame"><svg class="grid" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{grid}{deco}</svg>{art}
<span class="cap">{E(cap)}</span><span class="badge">{E(badge)}</span><div class="cast">{imgs}</div></div></div>\n"""

ABBR = [("f(x)", "에프 엑스 — x를 넣으면 나오는 값"), ("Aᵀ", "에이 전치 — 가로와 세로를 바꾼 행렬"), ("A⁻¹", "에이 역행렬 — 곱하면 단위행렬이 되는 행렬"),
        ("det", "행렬식 — 0이면 역행렬이 없다"), ("Σ", "시그마 — 모두 더하기"), ("P(A|B)", "B가 일어났을 때 A의 확률"),
        ("∂, ∇", "편미분, 그래디언트(나블라) — 한 가중치씩 본 기울기, 그것을 모은 화살표"), ("λ", "람다 — 고유값 또는 규제 세기(문맥에 따라)"),
        ("MSE", "평균 제곱 오차 — 빗나간 양을 제곱해 평균"), ("PCA", "주성분 분석 — 가장 넓게 퍼진 방향 찾기"), ("RAG", "검색 증강 생성 — 비슷한 문서를 찾아 붙여 답하기"), ("LLM", "거대 언어 모델")]

def three(what, why, work):
    dl = "".join(f"<dt>{E(a)}</dt><dd>{E(b)}</dd>" for a, b in ABBR)
    return f"""<div class="three"><h2>처음 오신 분께 — 이 페이지를 3줄로</h2><ul>
<li><b>무엇을</b>: {what}</li><li><b>왜 중요한가</b>: {why}</li><li><b>업무에서는</b>: {work}</li></ul>
<p>코드를 몰라도 됩니다. 수식은 남기되, 기호마다 말로 먼저 풀어 드립니다. 막히는 곳이 있으면 그 장의 실습 대시보드부터 만져 보셔도 괜찮습니다.</p>
<details class="abbr"><summary>기호·약어 풀이 (펼치기)</summary><dl>{dl}</dl></details></div>\n"""

def talk(lines):
    out = []
    for k, e, t in lines:
        side = " r" if k == "moa" else ""
        out.append(f'<div class="line{side}">{face(k, e)}<div class="bub"><b style="color:var(--c-{COLOR[k]})">{E(CH[k][0])}</b>{E(t)}</div></div>')
    return '<div class="talk">' + "".join(out) + "</div>"

def crowd(text, faces=(("x1", "e04"), ("x2", "e15"), ("x3", "e01"))):
    return '<div class="crowd">' + "".join(face(k, e, size=40) for k, e in faces) + f"<span>{E(text)}</span></div>"

def cast_section(note):
    keys = ["sia", "moa", "haru", "doctor", "fruitfly", "jupanbot"]
    items = "".join(f'<div class="who">{face(k, "e01" if k in ("sia","moa") else ("e20" if k=="haru" else "e13"))}<b>{E(CH[k][0])}</b><span>{E(CH[k][2])}</span></div>' for k in keys)
    xs = "".join(f'<div class="who">{face(k, "e04")}<b>{E(CH[k][0])}</b><span>{E(CH[k][2])}</span></div>' for k in ("x1", "x2", "x3"))
    return f'<section id="cast"><div class="wrap"><h2>등장인물</h2><p class="muted">{E(note)}</p><div class="cast-grid">{items}</div><details class="code"><summary>방청석 X1~X3 보기</summary><div class="cast-grid" style="margin-top:8px">{xs}</div></details></div></section>\n'

def dash(c):
    d = c["dash"]
    ms = "".join(f'<li data-m="{i}"{" class=hard" if i == 2 else ""}><span class="lv">{["미션 1 · 따라 하기","미션 2 · 맞혀 보기","미션 3 · 도전"][i]}</span>{E(m)}</li>' for i, m in enumerate(d["missions"]))
    j = d["judge"]
    return (f'<div class="panel dash" data-dash="{d["key"]}"><div class="ph"><b>실습 대시보드 {c["no"]} · {E(d["name"])}</b><small>{E(d["note"])}</small></div>'
            f'<p style="margin:0 0 4px"><b>하루의 미션</b> — {E(d["ask"])}</p><ol class="missions">{ms}</ol>'
            f'<div id="pp-{d["key"]}" data-panel="{d["key"]}"></div><div class="ctrl">{d["ctrl"]}</div><div class="readout" aria-live="polite"></div>'
            f'<div class="judge" data-m0="{E(j[0])}" data-m1="{E(j[1])}" data-m2="{E(j[2])}" data-m3="{E(j[3])}">{face("jupanbot","e09",size=40)}<span class="st">☆☆☆</span><span class="msg">{E(j[0])}</span></div>'
            '<p class="hint" style="margin:8px 0 0">미션 3(도전)은 앞의 두 미션을 마치면 열립니다. 별은 이 브라우저에만 저장되고, 16장 실전 연습장에서 모아 봅니다.</p></div>')

def quiz(q, opts, ans, ok, no):
    b = "".join(f'<button type="button">{E(o)}</button>' for o in opts)
    return f'<div class="quiz" data-ans="{ans}"><div class="qq">확인 퀴즈 — {E(q)}</div><div class="opts">{b}</div><div class="fb" aria-live="polite"></div><span class="qok" hidden>{E(ok)}</span><span class="qno" hidden>{E(no)}</span></div>'

def scene(no):
    f = f"assets/scenes/scene_{no:02d}.webp"
    return f'<figure style="margin:12px 0"><img src="{f}" alt="{no}장 장면 그림" width="1200" height="800" loading="lazy" style="width:100%;height:auto;border-radius:12px;border:1px solid var(--rule)"></figure>' if os.path.exists(os.path.join(ROOT, f)) else ""

def chapter(c, nxt):
    why = "".join(f"<li><b>{['문제','앞 장의 한계','해법'][i]}</b> — {E(x)}</li>" for i, x in enumerate(c["why"]))
    pcs = "".join(f"<tr><td class='m'>{E(a)}</td><td>{E(b)}</td></tr>" for a, b in c["pieces"])
    tries = "".join(f"<div>{E(t)}</div>" for t in c["tries"])
    solve = "".join(f"<p>{E(s)}</p>" for s in c["solve"])
    ai = "".join(f"<li>{x}</li>" for x in c["ai"])
    links = "".join(f'<li><span class="lk">{E(l)}</span>{t}</li>' for l, t in c["links"])
    ch = "".join(f'<p class="hint">📝 원자료와 다르게 쓴 곳 — {E(x)}</p>' for x in c.get("changes", []))
    q = c["quiz"]
    code = ""
    if c.get("code"):
        code = f'<details class="code"><summary>파이썬 코드로 보면 (몰라도 됩니다)</summary><pre><code>{E(c["code"][0])}</code></pre><p>{E(c["code"][1])}</p></details>'
    nx = f'<div class="next"><span></span><a class="go" href="{nxt[0]}">{E(nxt[1])} →</a></div>' if nxt else ""
    src = f'원자료 카드 {c["card"]}' if c["card"] else "원자료에 없던 장 — 이 해설에서 새로 만든 보강 카드"
    return f"""<section class="room" id="{c['id']}"><div class="wrap">
<div class="roomno">{c['no']}장 · {E(c['partlabel'])}</div>
<h2>{E(c['title'])}</h2><p class="muted">{E(c['sub'])}</p>{scene(c['no'])}
<div class="tags"><span class="tag src">{E(src)}</span><span class="tag how">{E(c['how'])}</span><span class="tag day">{E(c['day'])}</span></div>
{talk(c['open'])}
<div class="duo">
<div class="box why"><h4>왜 이 개념이 필요한가</h4><ol>{why}</ol><div class="easy"><b>쉽게 말하면</b> — {E(c['easy'])}</div></div>
<div class="box mathbox"><h4>수학 수식을 어려워하는 조수가 대신 물어봅니다</h4>
<div class="q">{face('haru','e04')}<div><b>조수</b> {E(c['ask'])}</div></div>
<div class="easy"><b>말로 하면</b> — {E(c['words'])}</div>
<div class="fx">{E(c['formula'])}</div>
<table><thead><tr><th>식 조각</th><th>읽는 법과 뜻</th></tr></thead><tbody>{pcs}</tbody></table>
<div class="try"><b>숫자로 한 번 해 보기</b>{tries}</div>
<p><b>학교 수학으로 보면</b> — {E(c['school'])}</p>
<div class="q">{face('haru','e16')}<div><b>조수</b> {E(c['haru_c'])}</div></div></div>
</div>
<div class="pair"><div class="box"><h4>생선 가게에서</h4><p>{E(c['fish'])}</p></div><div class="box ml"><h4>일상으로 치면</h4><p>{E(c['daily'])}</p></div></div>
<div class="aibox"><h4>AI 현장 — 이 공식은 어디에 쓰이나</h4><ul>{ai}</ul></div>
<div class="links-box"><h4>연결 고리 — 앞에서 온 것, 뒤로 가는 것</h4><ul>{links}</ul></div>
{talk(c['talk'])}
<div class="solve"><h4>풀이 — 이 숫자는 무슨 뜻인가</h4>{solve}<p><b>해석 문장</b> — {E(c['interp'])}</p></div>
<div class="solve"><h4>AI 판단 코너 — 그대로 믿어도 될까?</h4><p>{E(c['aiq'][0])}</p><details class="code"><summary>확인해 보기</summary><p>{E(c['aiq'][1])}</p></details></div>
{ch}
<div class="limit"><b>이 장의 한계</b> — {E(c['limit'])}</div>
{code}
{quiz(q[0], q[1], q[2], q[3], q[4])}
{talk([('doctor', 'e10', c['doc'])])}
{crowd(c.get('crowd', 'X1~X3: 이제 실습 차례! 하루, 힘내!'))}
{dash(c)}
{nx}
</div></section>
"""

# ---------------- 지식 색인
def kg_block(page, nodes_all, edges_all):
    nodes = [dict(id="lab:" + i, type=t, label=dict(ko=ko, en=en), anchor=a, definition=dict(ko=d), page=p, source="lab:work/mml_complete_notes")
             for i, t, ko, en, a, d, p in nodes_all if p == page or page == "*"]
    ids = {n["id"] for n in nodes}
    edges = [dict(s="lab:" + s, p=p, o="lab:" + o) for s, p, o in edges_all if "lab:" + s in ids and "lab:" + o in ids]
    raw = dict(version="1.3", page=page, series="인공지능을 위한 수학", nodes=nodes, edges=edges)
    ld = {"@context": {"@vocab": "urn:lab:", "skos": "http://www.w3.org/2004/02/skos/core#", "schema": "https://schema.org/"},
          "@graph": [{"@id": "urn:" + n["id"], "@type": n["type"], "skos:prefLabel": [{"@value": n["label"]["ko"], "@language": "ko"}, {"@value": n["label"]["en"], "@language": "en"}],
                      "skos:definition": n["definition"]["ko"], "schema:url": SITE + n["page"] + ".html" + n["anchor"]} for n in nodes]}
    refs = [dict(id="mml_complete_notes", type="graphic", title="Mathematics for Machine Learning — Complete Notes (Beginner to Advanced), MATH-01~12", author=[dict(literal="제작자 미상(사용자 제공 인포그래픽)")],
                 accessed={"date-parts": [[2026, 11, 22]]}, note="사용자 제공 이미지 13장. 공식과 예제를 다시 쓰고 실습 대시보드로 바꿈")]
    meta = dict(title=page, series="인공지능을 위한 수학", creator=[dict(name="안상선", role="author", affiliation="(주)M-Robo")], date=DATE, version=VER, license="캐릭터·그림 무단 사용 금지")
    J = lambda o: json.dumps(o, ensure_ascii=False).replace("</", "<\\/")
    return f"""<section id="kg"><div class="wrap"><h2>지식 색인 — 이 페이지에서 찾아보기</h2>
<p class="muted">이 페이지에 나온 개념·방법·비유·쓰임을 모았습니다. 검색하고, "설명 보러 가기"로 본문에 돌아갑니다.</p><div id="kg-mount"></div></div></section>
<section id="export"><div class="wrap"><h2>온톨로지·서지 꾸러미 — 이 페이지의 지식을 가져가기</h2>
<p class="muted">지식 색인을 출처와 함께 파일로 내려받습니다. 서지 관리는 BibTeX·RIS, 온톨로지 편집은 Turtle을 씁니다. 그래프 도구는 CSV, 여러 페이지 합치기는 kg.json입니다.</p><div id="export-mount"></div></div></section>
<script type="application/json" id="kg-raw">{J(raw)}</script>
<script type="application/ld+json" id="kg-ld">{J(ld)}</script>
<script type="application/json" id="refs-csl">{J(refs)}</script>
<script type="application/json" id="page-meta">{J(meta)}</script>
"""

def js(part):
    A = os.path.join(ROOT, "assets")
    headjs = open(os.path.join(A, "core_head.js")).read().replace("__DATA__", json.dumps(DATA))
    body = open(os.path.join(A, f"p{part}.js")).read()
    tail = open(os.path.join(A, "core_tail.js")).read()
    return ("(function(){\n" + headjs + "\n" + body + "\n" + tail + "\n})();").replace("</script", "<\\/script")

def footer(part):
    links = " · ".join(f'<a href="{f}">{p} {E(t)}</a>' for f, p, t, r in PARTS) + f' · <a href="{REPO}">저장소</a>'
    return f"""<footer><div class="wrap">
<h3>출처</h3>
<div class="tbl"><table><thead><tr><th>#</th><th>자료</th><th>이 페이지에서 쓴 곳</th></tr></thead><tbody>
<tr><td>[1]</td><td>인포그래픽 「Mathematics for Machine Learning — Complete Notes (Beginner to Advanced)」 표지와 MATH-01~12 (사용자 제공 이미지, 2026-11-22 확인. 제작자 표기 확인 중)</td><td>각 장의 "공식 한 장 요약"과 예제 숫자. 이미지는 붙여 넣지 않고 공식과 예제를 다시 썼음. 보강 A~C(고유값·PCA, 정보이론, 최적화)는 원자료에 없어 이 해설에서 새로 씀</td></tr>
<tr><td>[2]</td><td>안상선, 「인공지능을 위한 수학」 기획안 v1.2</td><td>장 순서, 연결 고리 L1~L14, 실습 대시보드 설계</td></tr>
</tbody></table></div>
<h3>예시값·설명용 숫자</h3>
<p>생선 가게의 농어·도미·빙어 숫자는 모두 설명용 예시값입니다. 실제 어종의 측정값이 아닙니다. 실습 대시보드의 손실 그릇(14·15장)도 설명용으로 단순하게 만든 모양입니다. 경영·투자·의료 판단의 근거로 쓰지 마세요.</p>
<p>캐릭터 이름·설정·그림은 저작권자 안상선의 허락 없이 사용할 수 없습니다. 캐릭터 그림: fruitfly-lab-expressions.</p>
<p>글 · 안상선 ((주)M-Robo 대표) · <a href="{AUTHOR_URL}">저자 소개</a> · {DATE} · {VER}</p>
<p>{links}</p>
</div></footer>
<script>
{js(part)}
</script>
</body></html>
"""

def build_part(mod, part):
    C = mod
    fn = PARTS[part - 1][0]
    s = head(C.TITLE, C.DESC, f"og_part{part}.jpg", fn)
    s += nav(C.NAV)
    s += cover(C.COVER_CAP, C.COVER_CAST, img=C.COVER_IMG if os.path.exists(os.path.join(ROOT, C.COVER_IMG)) else None)
    s += f"""<header class="hero"><div class="wrap"><span class="kicker">{E(C.KICKER)}</span>
<h1>{C.H1}</h1><p class="lead">{C.LEAD}</p>
<p class="byline">글 · 안상선 ((주)M-Robo 대표) · <a href="{AUTHOR_URL}">저자 소개</a> · {DATE} · {VER}</p>{partbar(fn)}</div></header>
<section><div class="wrap">{three(*C.THREE)}</div></section>
"""
    s += C.intro(globals())
    chs = C.CHAPTERS
    for i, c in enumerate(chs):
        nxt = (f"#{chs[i+1]['id']}", f"{chs[i+1]['no']}장 {chs[i+1]['short']}") if i + 1 < len(chs) else C.NEXT
        s += chapter(c, nxt)
    s += C.outro(globals())
    s += kg_block(fn.replace(".html", ""), C.KG_NODES, C.KG_EDGES)
    s += footer(part)
    open(os.path.join(ROOT, fn), "w").write(s)
    return fn

if __name__ == "__main__":
    for m, p in ((content1, 1), (content2, 2), (content3, 3)):
        print("built", build_part(m, p))
