# 젠스파크용 그림 프롬프트 v2 — 인공지능을 위한 수학 (픽셀풍)

> 대상: https://adminmrobo.github.io/math_for_ai_lab/ (1부 index · 2부 part2 · 3부 part3 · 실전 연습장 practice)  
> v1(2026-11-22) → v2(2026-11-23): 표지 3장 다시 다듬음, **장마다 이해를 돕는 설명 그림**(0~15장)으로 장면 그림을 새로 짬, 대결 3장·실전 연습장 3장(선택) 추가, 금지 표현 재검사 결과 기록  
> 화풍: 16비트 RPG 픽셀아트 · 낮의 연구실 · 흰 배경

## 쓰는 법

- 블록 하나를 통째로 붙여 넣습니다. 첫머리(화풍)·캐릭터 묘사·끝머리(금지 사항)가 모두 들어 있습니다.
- **참고 그림**: 표에 적은 캐릭터 표정 그림을 같이 올립니다. 저장소 `assets/chars/{이름}_eXX.webp`(sia·moa·haru·doctor·fruitfly·jupanbot)에 같은 파일이 있습니다.
- **순서**: 1부 표지 → 그림체 확인 → 그 표지를 참고 그림으로 함께 올려 나머지 요청. 한 대화에 3~5장, 같은 비율끼리 묶습니다.
- 그림 속 글자·숫자·수식은 넣지 않습니다. 공식은 페이지 본문이 맡습니다.
- 설명 그림은 **왼쪽 일상 비유 / 오른쪽 생선 가게·AI** 처럼 한 장 안에서 비유와 개념이 이어지게 짰습니다. 각 블록의 `The picture alone should make this idea clear` 줄이 그 그림이 전해야 할 한 문장입니다 — 결과가 이 문장을 못 전하면 그 줄만 남기고 장면을 단순하게 다시 요청하세요.

| 종류 | 비율·크기 | 저장 위치 | 페이지 반영 |
|---|---|---|---|
| 표지 3장 | 16:9 · 1600×900 | `assets/cover/cover_part1~3.webp` | 이미 연결됨 — 파일 넣고 `python3 build/build.py` |
| 공유 미리보기 | 1200×630 | `assets/og/og_part1~3.jpg` | 표지에서 잘라 만듦(`build/make_og.py`) |
| 1~15장 설명 그림 | 3:2 · 1200×800 | `assets/scenes/scene_01~15.webp` | 이미 연결됨 — 장 제목 바로 아래에 자동으로 들어감 |
| 0장 설명 그림 | 3:2 · 1200×800 | `assets/scenes/scene_00.webp` | 넣을 자리 추가 필요(0장은 지도 전용 구역) |
| 대결 3장 (선택) | 3:2 · 1200×800 | `assets/scenes/duel_1~3.webp` | 넣을 자리 추가 필요 — 결과 공개 전 장면 |
| 실전 연습장 3장 (선택) | 3:2 · 1200×800 | `assets/scenes/practice_*.webp` | 넣을 자리 추가 필요 |

줄일 때는 '가장 가까운 이웃' 방식으로(픽셀이 뭉개지지 않게), WebP로 저장합니다.

## 캐릭터 줄 (프롬프트에 그대로 들어가 있음)

| 캐릭터 | 영어 묘사 | 참고 파일 |
|---|---|---|
| 시아 | a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow | sia_eXX |
| 모아 | a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan | moa_eXX |
| 조수 하루 | a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie | haru_eXX |
| 박사 | a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie | doctor_eXX |
| 초파리 연구원 | an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings | fruitfly_eXX |
| 주판봇 | a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads | jupanbot_eXX |
| X1~X3 | three small cute spare characters drawn as solid black silhouettes with round white eyes, sitting in audience chairs | x1~x3 |

---

## A. 표지 3장 (16:9)

표지마다 박사·조수 하루·초파리 연구원·주판봇 네 캐릭터가 모두 나오고, 이 시리즈의 질문자 시아·모아가 함께 나옵니다.

### A1. 1부 표지 — `cover_part1.webp` · index.html

- 참고 표정: 시아 E19 · 모아 E09 · 조수 하루 E20 · 박사 E08 · 초파리 연구원 E09 · 주판봇 E16
- 그림이 전하는 것: 공식 카드 15장을 실로 이어 지도를 만드는 장면 — '외우지 말고 어디에 끼우는 부품인지 본다'는 1부의 약속.
- 저장: `assets/cover/cover_part1.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Scene: on the white floor of the lab, fifteen blank formula cards are spread out in three rows, connected to each other by thin teal threads like a map. Behind them stands a small friendly pixel machine with a fish-shaped intake on one side and a tag outlet on the other, its side panel open to show empty slots waiting for the cards. A small wooden fish-shop crate with a few silver fish sits at the edge.
Characters: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, sparkling eyes, tying a teal thread between two cards; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking with a finger on her chin, holding the other end of the thread; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, nervous with a drop of sweat, holding one silver fish in both hands; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, pointing at the card map; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, holding up a pixel arrow sign as if saying "try pressing this"; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, carrying a stack of blank cards proudly.
Mood: the start of a study adventure, calm and bright.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A2. 2부 표지 — `cover_part2.webp` · part2.html

- 참고 표정: 모아 E09 · 박사 E07 · 주판봇 E16 · 초파리 연구원 E09 · 조수 하루 E08 · 시아 E01
- 그림이 전하는 것: 생선 저울·확률 막대·점구름 — 데이터를 '읽고' 불확실성을 '말하는' 2부.
- 저장: `assets/cover/cover_part2.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Scene: a fish-shop counter inside the bright lab; a large pixel balance scale holds silver fish on one side; beside it, three tall glowing bars of different heights stand like a bar chart, and a cloud of small teal dots floats in the air forming a slanted oval, with a soft flashlight beam casting its long shadow on the wall.
Characters: a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, proudly pushing up the tallest bar; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, looking at the dot cloud through a magnifying glass; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, happy, weighing a fish; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, holding the flashlight with focused eyes; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, calmly holding a clipboard.
Mood: curious and careful, like reading clues.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### A3. 3부 표지 — `cover_part3.webp` · part3.html

- 참고 표정: 조수 하루 E19 · 박사 E10 · 시아 E16 · 모아 E19 · 초파리 연구원 E09 · 주판봇 E16
- 그림이 전하는 것: 등고선 그릇을 공이 조금씩 내려가는 장면 — '조금씩 고치며 배우기'.
- 저장: `assets/cover/cover_part3.webp`

```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Scene: a giant pixel contour map is painted on the lab floor like a shallow bowl, with nested teal oval rings; an orange ball rolls down along a dotted path toward the glowing center; a small checkered finish flag stands at the center.
Characters: a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, sparkling eyes, gently pushing the ball; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, waiting at the finish flag with a calm thumbs-up; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, proud; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, sparkling eyes, cheering; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, watching the ball path through a magnifying glass; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, holding a small blank scoreboard.
Mood: a satisfying last stretch, bright and hopeful.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

---

## B. 장마다 이해를 돕는 설명 그림 (3:2)

장의 '일상 비유'와 '핵심 한 줄'을 그대로 그림으로 옮겼습니다. 장을 여는 질문자(시아 또는 모아)와 조수 하루가 중심이고, 초파리 연구원·주판봇이 돕고, 박사가 정리하는 역할 그대로입니다.

| 장 | 일상 비유 | 이 그림이 이해시키는 것 |
|---|---|---|
| 0 수학 지도 펼치기 | 모델이 하는 네 동작 | 공식 15장은 따로 노는 지식이 아니라 한 기계의 네 동작(담기·계산·재기·고치기) 부품이라는 것. |
| 1 함수 | 자판기 | 입력 → 규칙 → 출력. 그리고 규칙의 '모양'(직선이냐 곡선이냐)을 먼저 고르고, 상수는 그다음에 맞춘다. |
| 2 행렬 | 엑셀 표 | 가로줄 하나 = 생선 한 마리, 세로줄 하나 = 특성 하나. 생선이 늘면 아래로, 특성이 늘면 옆으로 표가 자란다. |
| 3 벡터 연산 | 취향이 닮은 친구 | 닮음에는 두 질문이 있다 — 끝점이 가까운가(거리), 방향이 같은가(각도·코사인). 둘의 답이 다를 수 있다. |
| 4 행렬 연산 | 장바구니 계산 | 행렬곱 = 가로줄마다 내적을 한꺼번에. 모양 규칙: 앞 표의 세로줄 수와 뒤 표의 가로줄 수가 같아야 끼워진다. |
| 5 연립방정식 | 두 조건으로 값 맞히기 | 정규방정식은 가장 좋은 직선을 한 번에 구한다. 그러나 점이 한쪽에 몰리면 직선이 시소처럼 흔들리고, λ(릿지)를 더하면 안정된다. |
| 6 통계 기초 | 시험 평균과 등수 | 평균은 이상한 값 하나에 크게 끌려가고 중앙값은 버틴다. 울타리(IQR)로 이상한 값을 골라낸다. |
| 7 상관·공분산 | 키와 신발 크기 | 두 특성이 함께 움직이면 같은 이야기를 겹쳐 하는 것. 겹친 정보는 하나만 남겨도 된다. |
| 8 고유값·PCA | 손전등 그림자 | 점구름을 어느 방향에서 비추느냐에 따라 그림자 길이가 다르다. 그림자가 가장 긴 방향(고유벡터)이 정보를 가장 많이 담는다. |
| 9 확률 기초 | 일기예보 강수확률 | 확률은 '아마도'를 0과 1 사이 숫자로 말하는 것. 한두 번 뽑으면 들쭉날쭉하지만 많이 뽑을수록 비율이 실제 확률에 붙는다. |
| 10 조건부 확률·베이즈 | 화재경보 | 경보(증거)가 울렸다고 진짜 불(드문 일)일 확률이 높은 건 아니다. 원래 얼마나 흔한지(사전확률)에 따라 결과가 크게 달라진다. |
| 11 확률분포 | 버스 기다리는 시간 | 데이터마다 모양이 있다 — 종 모양(길이), 한쪽으로 쏠린 막대(손님 수), 처음이 높고 급히 줄어드는 곡선(기다린 시간). 모양을 보고 분포를 고른다. |
| 12 정보이론 | 뻔한 뉴스와 깜짝 뉴스 | 드문 일일수록 많이 놀란다(놀람 = −log 확률). 모델이 정답에 칩을 적게 걸었을수록 손실(교차 엔트로피)이 급하게 커진다. |
| 13 미적분 기초 | 속도계 | 미분 = 아주 조금 움직였을 때 얼마나 변하는지. 확대하면 곡선도 직선처럼 보이고, 그 기울기가 0인 곳이 바닥이다. |
| 14 편미분·그래디언트 | 안개 낀 산 내려오기 | 가중치마다 따로 잰 기울기(편미분)를 화살표 하나(그래디언트)로 모아, 그 반대쪽으로 작게 한 걸음. 걸음이 너무 크면 튕겨 나간다. |
| 15 최적화 | 썰매와 내비게이션 | 길쭉하거나 울퉁불퉁한 그릇에서는 걷는 방법이 결과를 바꾼다 — 지그재그(경사하강), 관성으로 미끄러지기(모멘텀), 길마다 보폭 조절(Adam). |

### B0. 0장 수학 지도 펼치기 — `scene_00.webp`

- 일상 비유: 모델이 하는 네 동작
- 참고 표정: 박사 E08 · 조수 하루 E20 · 시아 E19 · 모아 E09 · X1~X3 E01
- 넣는 곳: 0장 제목 아래 (넣을 자리 추가 필요)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: one wide lab room seen from slightly above, divided into four stations connected left to right by a teal floor path.
Scene: Station 1 (put in): fish slide from a crate into a tidy grid rack. Station 2 (calculate): a small gear machine with conveyor. Station 3 (measure): a balance scale and a tape measure next to a glowing bar chart. Station 4 (fix): a small ball rolling down a shallow bowl toward a star. Blank formula cards float above each station and snap into slots on the machines.
Characters: a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie unrolls a large blank map that shows the same four stations, pointing at it; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, nervous with a drop of sweat, hugging a tall stack of blank cards; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, sparkling eyes, carrying one card toward station 1; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking, matching a card to a slot at station 3; three small cute spare characters drawn as solid black silhouettes with round white eyes sit in audience chairs at the back, one waving a tiny cheering stick.
The picture alone should make this idea clear: every formula card is a part that fits into one machine with four steps: put data in, calculate, measure the error, fix a little.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B1. 1장 함수 — `scene_01.webp`

- 일상 비유: 자판기
- 참고 표정: 시아 E01 · 조수 하루 E07 · 초파리 연구원 E09
- 넣는 곳: 1장 제목 아래 (scene_01)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: left 30%: a small everyday drink vending machine — a coin goes in, a can drops out. Right 70%: the same idea as a big fish-shop machine.
Scene: The fish machine has an intake slot on top shaped like a fish and an outlet at the bottom where a small blank weight tag drops out. A round window on its front shows a gently upward-bending glowing curve; a spare straight-line cartridge has just been pulled out and lies on the floor. Two small dials on the side are the adjustable constants.
Characters: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, happy, sliding a silver fish into the top slot; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie stands beside the machine explaining with one hand raised; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, carefully turning one of the side dials while holding up a pixel arrow sign as if saying "try pressing this".
The picture alone should make this idea clear: a model is a machine that turns an input into an output by a rule; first choose the rule's shape (a curve fits fish better than a straight line), then tune the dials.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B2. 2장 행렬 — `scene_02.webp`

- 일상 비유: 엑셀 표
- 참고 표정: 모아 E09 · 주판봇 E16 · 조수 하루 E07
- 넣는 곳: 2장 제목 아래 (scene_02)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: a big open wooden rack against the white wall, built as a neat grid of shelves: rows and columns.
Scene: Each horizontal row holds one silver fish lying in it. On top of each vertical column hangs one measuring tool icon: a ruler (length), a height gauge (height), a small scale (weight). An orange glowing frame highlights one whole row, and a teal glowing frame highlights one whole column. A new empty row is being added at the bottom, and a new empty column at the right.
Characters: a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking, sliding a new fish into the new bottom row; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, proudly bolting a new column onto the right side, holding a new measuring tool; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, explaining with an orange pointer stick on the row and a teal pointer stick on the column.
The picture alone should make this idea clear: a matrix is just a table: one row per fish, one column per feature; more fish make it taller, more features make it wider.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B3. 3장 벡터 연산 — `scene_03.webp`

- 일상 비유: 취향이 닮은 친구
- 참고 표정: 시아 E19 · 모아 E09 · 조수 하루 E07
- 넣는 곳: 3장 제목 아래 (scene_03)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: a white floor grid seen from above with three glowing arrows starting from the same corner point.
Scene: A short blue arrow and a long blue arrow point in exactly the same direction (a small fish and a big fish of the same shape). A short green arrow points in a clearly different direction, its tip lying very close to the tip of the short blue arrow. In a small round inset in the top corner: two friends holding plates of the same favorite dishes, their thought arrows pointing the same way.
Characters: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, sparkling eyes, stretching a measuring tape between the two close arrow tips; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking, holding a large protractor at the narrow angle between the two blue arrows; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie stands between them, pointing at both tools with two hands.
The picture alone should make this idea clear: closeness of tips (distance) and sameness of direction (angle) are two different kinds of similarity, and they can disagree.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B4. 4장 행렬 연산 — `scene_04.webp`

- 일상 비유: 장바구니 계산
- 참고 표정: 주판봇 E16 · 초파리 연구원 E09 · 모아 E01
- 넣는 곳: 4장 제목 아래 (scene_04)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: a small pixel factory line running left to right.
Scene: A stack of fish cards enters a box-shaped machine; on top of the machine sits a panel with two lever weights. Out of the other side comes a neat stack of blank weight tags, all at once. In front of the machine, a big plug-and-socket check: a plug with two prongs slides perfectly into a two-hole socket glowing green, while a plug with three prongs sits rejected beside a red-lit two-hole socket.
Characters: a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, proudly pulling the levers; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, pointing at the three-prong plug with a warning look; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, happy, catching the stack of tags in a basket like a shopping basket at a checkout.
The picture alone should make this idea clear: multiplying a table by weights computes every fish in one go, and the shapes must match like a plug and a socket or it will not fit.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B5. 5장 연립방정식 — `scene_05.webp`

- 일상 비유: 두 조건으로 값 맞히기
- 참고 표정: 시아 E04 · 조수 하루 E10 · 박사 E07
- 넣는 곳: 5장 제목 아래 (scene_05)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: split into two panels side by side, left calm and right wobbly-then-fixed.
Scene: Left panel: five glowing dots spread across a floor grid, and an orange straight line placed through them in one move by a big round button. Right panel: five dots squeezed into one narrow vertical strip; an orange line balanced on them tilts wildly like a seesaw, drawn with motion lines; a small teal stabilizer weight is being set at the center of the line, and a ghosted steady line shows where it settles.
Characters: a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, calmly pressing the big round button on the left; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, surprised at the wobbling line on the right; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, confident, placing the teal stabilizer weight.
The picture alone should make this idea clear: one formula solves the best line at once, but when the data are bunched together the answer wobbles, and adding a small stabilizer (ridge) calms it.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B6. 6장 통계 기초 — `scene_06.webp`

- 일상 비유: 시험 평균과 등수
- 참고 표정: 시아 E24 · 조수 하루 E07 · 주판봇 E15
- 넣는 곳: 6장 제목 아래 (scene_06)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: a long white table seen from the front, like a lineup.
Scene: A row of silver fish lies on the table sorted from small to large, and one absurdly giant fish lies at the far right end. Under the table a long plank balances on a small triangle: the triangle (the average) has slid far toward the giant fish, while a navy flag (the middle value) still stands at the middle fish. A red dashed fence line surrounds the normal fish and leaves the giant fish outside.
Characters: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, shocked at the giant fish; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, explaining calmly while planting the red fence; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, flustered, trying to push the sliding triangle back.
The picture alone should make this idea clear: one strange value drags the average a lot but barely moves the middle value, and a simple fence finds the strange value.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B7. 7장 상관·공분산 — `scene_07.webp`

- 일상 비유: 키와 신발 크기
- 참고 표정: 모아 E09 · 주판봇 E14 · 조수 하루 E07 · X1~X3 E01
- 넣는 곳: 7장 제목 아래 (scene_07)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: two white wall boards side by side, with a small lineup in front.
Scene: Left board: teal dots form a tight slanted line (length and height of fish). Right board: teal dots scattered randomly (arrival day and length). In front, three small cute spare characters drawn as solid black silhouettes with round white eyes stand in a row from shortest to tallest, and their shoes grow bigger in the same order.
Characters: a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking, comparing the two boards with a finger on her chin; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, sheepish, holding two identical rulers stacked exactly on top of each other; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie points at the tight slanted line.
The picture alone should make this idea clear: when two features rise and fall together they tell the same story twice, like height and shoe size; random scatter means no shared story.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B8. 8장 고유값·PCA — `scene_08.webp`

- 일상 비유: 손전등 그림자
- 참고 표정: 조수 하루 E08 · 모아 E19 · 박사 E07
- 넣는 곳: 8장 제목 아래 (scene_08)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: a floating oval cloud of teal dots in the middle of the room, with two walls catching shadows.
Scene: One flashlight beam hits the cloud along its long side and casts a long orange shadow line on the back wall; a second, faint beam from the perpendicular side casts only a tiny short shadow on the side wall. A thick blue arrow lies along the long axis of the cloud.
Characters: a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, focused, rotating the flashlight on a small stand; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, sparkling eyes, measuring the long shadow with a tape; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie calmly holds the end of the blue arrow.
The picture alone should make this idea clear: a cloud of data casts the longest shadow in one special direction; keeping only that direction keeps almost all the information.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B9. 9장 확률 기초 — `scene_09.webp`

- 일상 비유: 일기예보 강수확률
- 참고 표정: 시아 E19 · 주판봇 E07 · 모아 E01
- 넣는 곳: 9장 제목 아래 (scene_09)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: a clear glass tank on the left, two tall glass jars on the right, a window in the background.
Scene: The tank holds red sea bream and small silver smelt swimming together. Each scoop drops a red or silver bead into the matching jar; three small pairs of jars in a row show the levels after a few scoops (uneven), more scoops, and very many scoops (both levels resting right on a dashed guide line). Through the window, a half-sunny, half-cloudy sky and an umbrella leaning by the sill.
Characters: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, excited, holding the scoop net; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, explaining while flicking abacus beads to count; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, happy, holding a folded umbrella and glancing at the sky.
The picture alone should make this idea clear: probability turns a maybe into a number, and the more times you draw, the closer the counted share gets to that number.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B10. 10장 조건부 확률·베이즈 — `scene_10.webp`

- 일상 비유: 화재경보
- 참고 표정: 시아 E04 · 모아 E09 · 박사 E07 · 초파리 연구원 E14
- 넣는 곳: 10장 제목 아래 (scene_10)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: left 40%: a lab kitchen corner; right 60%: a wall board.
Scene: Left: a ceiling smoke alarm flashing with sound lines, but the only smoke comes from a slightly burnt piece of toast. Right: a wall board showing a grid of one hundred tiny round person icons; one is lit red (real case) and about five are lit orange (false alarms); the rest are plain gray.
Characters: an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, sheepish, holding the burnt toast; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, surprised, staring at the alarm; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking deeply in front of the board; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie calmly points out that the orange icons outnumber the red one.
The picture alone should make this idea clear: an alarm going off does not mean a fire is likely, because real fires are rare and false alarms are many.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B11. 11장 확률분포 — `scene_11.webp`

- 일상 비유: 버스 기다리는 시간
- 참고 표정: 조수 하루 E07 · 시아 E09 · 초파리 연구원 E09
- 넣는 곳: 11장 제목 아래 (scene_11)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: three wooden display stands in a row inside the lab, a bus stop visible through a big window behind.
Scene: Stand 1: small fish blocks piled into a symmetric bell-shaped hill. Stand 2: stacks of tiny customer blocks leaning to the left side, a short tail to the right. Stand 3: a stopwatch next to stacked blocks that start tall and drop off quickly. Clear curved plastic templates of different shapes hang on a rack.
Characters: a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, explaining, laying a clear bell-shaped template over stand 1 so it fits; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, thinking, waiting at the bus stop outside the window and checking her wristwatch; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, holding up a pixel arrow sign as if saying "try pressing this" next to the template rack.
The picture alone should make this idea clear: every kind of data has its own shape, and you pick the matching curve by looking at the shape first.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B12. 12장 정보이론 — `scene_12.webp`

- 일상 비유: 뻔한 뉴스와 깜짝 뉴스
- 참고 표정: 시아 E04 · 모아 E09 · 조수 하루 E07 · 주판봇 E15
- 넣는 곳: 12장 제목 아래 (scene_12)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: a fish-shop betting table in the front, a tall surprise meter on the right.
Scene: Three plates on the table (sea bream, smelt, perch) with stacks of betting chips: a tall stack on sea bream, a tiny stack on smelt. A gift box on the table bursts open and a smelt pops out with big surprise sparks. On the right, a tall thermometer-style surprise meter shoots up steeply into the red, and a heavy pile of gray penalty weights drops onto a scale.
Characters: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, surprised by the popping smelt; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking, looking at the tiny chip stack; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, explaining calmly beside the meter; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, flustered, holding the heavy penalty weights.
The picture alone should make this idea clear: the less you bet on what actually happens, the bigger the surprise, and that surprise is how wrong the model was.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B13. 13장 미적분 기초 — `scene_13.webp`

- 일상 비유: 속도계
- 참고 표정: 시아 E19 · 조수 하루 E08 · 박사 E10
- 넣는 곳: 13장 제목 아래 (scene_13)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: a smooth curved hill shaped like a shallow valley painted on the lab floor, seen from the side.
Scene: Partway down the slope, a big magnifying glass floats over one point; inside the glass the curve looks almost straight and a short green tangent line touches it. A small toy car with a round speedometer gauge rolls on the slope. At the valley bottom the floor is flat and a small flag stands there.
Characters: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, sparkling eyes, eyes closed and gently testing the slope with one foot; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, focused, holding the magnifying glass; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie waits by the flat bottom with a calm thumbs-up.
The picture alone should make this idea clear: a derivative is how fast things change when you move just a tiny bit; zoom in and a curve looks straight, and the bottom is where the slope is flat.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B14. 14장 편미분·그래디언트 — `scene_14.webp`

- 일상 비유: 안개 낀 산 내려오기
- 참고 표정: 모아 E08 · 주판봇 E15 · 조수 하루 E07
- 넣는 곳: 14장 제목 아래 (scene_14)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: a foggy pixel mountain slope with nested contour rings and a glowing star at the bottom.
Scene: On the ground in front of the hiker, a short east-west arrow and a short north-south arrow combine into one diagonal arrow pointing straight downhill. A line of small red footprints, evenly spaced, leads toward the star. Off to the side, a trail of huge leaps bounces out of the valley.
Characters: a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, holding a compass and pointing downhill along the diagonal arrow; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, flustered, bouncing away after a too-big jump; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, explaining, holding a lantern that lights the two small arrows.
The picture alone should make this idea clear: measure the slope in each direction, join them into one arrow, and take a small step the downhill way; steps that are too big bounce you out.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### B15. 15장 최적화 — `scene_15.webp`

- 일상 비유: 썰매와 내비게이션
- 참고 표정: 시아 E19 · 모아 E13 · 주판봇 E15 · 조수 하루 E10
- 넣는 곳: 15장 제목 아래 (scene_15)

```
Educational explainer illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Layout: a long narrow snowy valley seen from above at an angle, with a finish flag at the far end.
Scene: Three racers start together. Racer 1 walks and zigzags from wall to wall of the valley. Racer 2 rides a sled and glides smoothly down the middle with speed lines. Racer 3 drives a small pixel car with a navigation screen and wheels that adjust their size, keeping a steady line.
Characters: a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, flustered, as the zigzag walker; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, excited, riding the sled; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, calm, driving the little car; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, confident, waving a referee flag at the finish.
The picture alone should make this idea clear: in a long narrow bowl, how you walk matters: plain steps zigzag, carrying speed glides, and adjusting each wheel keeps a steady path.
Composition: keep every face and hand inside the central safe area (8% margin on every side); large simple shapes that still read clearly at phone width.
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

---

## C. 대결 장면 3장 (선택, 3:2)

결과 공개 버튼 **위**에 두는 '시작 직전' 장면이라 누가 이기는지 드러내지 않습니다. 대결의 심판은 시아·모아(3부는 두 사람이 선수라 하루가 심판, 박사가 판정)입니다.

### 1부 대결 — 흔들리는 직선 대결 — 릿지를 쓸까, 말까 — `duel_1.webp`

- 참고 표정: 초파리 연구원 E10 · 주판봇 E16 · 시아 E13 · 모아 E13 · X1~X3 E01

```
Scene illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Scene: a duel stage in the bright lab with two small podiums facing each other; in the middle, five silver fish of almost exactly the same length lie on a very narrow bench, and behind a white cloth wait five new fish of very different sizes, covered.
Characters: Left podium: an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, confident, holding a small teal stabilizer weight. Right podium: a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, proud, hand on a big shiny round button. a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow and a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan stand at the center as judges, each holding a small blank flag; three small cute spare characters drawn as solid black silhouettes with round white eyes sit in audience chairs, excited.
Mood: tense but friendly, right before the start. Do not show who wins.
Composition: keep every face and hand inside the central safe area (8% margin on every side).
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### 2부 대결 — 표본 크기 대결 — 30번 꼼꼼히 vs 1만 번 — `duel_2.webp`

- 참고 표정: 초파리 연구원 E08 · 주판봇 E16 · 시아 E13 · 모아 E13 · X1~X3 E01

```
Scene illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Scene: a duel stage with one big glass tank of red sea bream and silver smelt in the middle.
Characters: Left: an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, focused, drawing a handful of fish one by one with tweezers and a magnifying glass, a small notebook beside. Right: a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, proud, operating a big scooping machine that pours a river of red and silver beads into a huge counting hopper. a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow and a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan stand at the center as judges with small blank flags; three small cute spare characters drawn as solid black silhouettes with round white eyes cheer from audience chairs.
Mood: playful rivalry, right before the result. Do not show who wins.
Composition: keep every face and hand inside the central safe area (8% margin on every side).
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### 3부 대결 — 생선 가게 운영 대결 — 시아의 설정 vs 모아의 설정 — `duel_3.webp`

- 참고 표정: 시아 E19 · 모아 E09 · 조수 하루 E10 · 박사 E13 · X1~X3 E01

```
Scene illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Scene: two identical fish-shop counters side by side in the lab, with a covered tray of eight test fish between them.
Characters: Left counter: a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, excited, with one simple ruler and a fast spinning dial. Right counter: a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking, with a small cube-shaped measuring box and a leveling tool. a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie stands between them as the referee with a flag; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie sits at a judge's desk holding a blank clipboard; three small cute spare characters drawn as solid black silhouettes with round white eyes sit in audience chairs.
Mood: a friendly showdown before the reveal. Do not show who wins.
Composition: keep every face and hand inside the central safe area (8% margin on every side).
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

---

## D. 실전 연습장 3장 (선택, 3:2)

### 불량 검사 공장 — `practice_factory.webp` · practice/index.html#factory

- 참고 표정: 조수 하루 E07 · 시아 E09 · 주판봇 E16

```
Scene illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Scene: a parts factory line inside the lab: small parts pass under a scanner; an alarm lamp above has a sliding lever that sets how easily it lights. A few parts trigger an orange lamp and go to a re-check table; one cracked part slips past on the belt.
Characters: a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, explaining, hand on the lever; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, thinking, at the re-check table; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, proud, tallying with abacus beads.
Mood: focused teamwork.
Composition: keep every face and hand inside the central safe area (8% margin on every side).
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### 콜센터 — `practice_callcenter.webp` · practice/index.html#callcenter

- 참고 표정: 모아 E09 · 초파리 연구원 E09 · 박사 E07

```
Scene illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Scene: a small cheerful call center corner in the lab: a row of desks with headsets, a queue of glowing phone icons waiting on a wall board, and a stopwatch on a shelf.
Characters: a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking, deciding how many headsets to hand out; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, holding up a pixel arrow sign as if saying "try pressing this" toward the queue board; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, calmly explaining.
Mood: busy but calm.
Composition: keep every face and hand inside the central safe area (8% margin on every side).
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

### 광고 예산 분석 — `practice_ads.webp` · practice/index.html#ads

- 참고 표정: 모아 E10 · 시아 E04 · 조수 하루 E07

```
Scene illustration, 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory, clean white background and white walls, soft natural sunlight, teal, orange and navy accents.
Scene: a lab wall with three colored spotlights (teal, orange, navy) whose circles overlap heavily; a pile of budget coins on a balance scale in front.
Characters: a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, confident, placing a small teal stabilizer weight on the scale; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, surprised that two spotlight circles almost completely overlap; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, explaining with a pointer.
Mood: thoughtful.
Composition: keep every face and hand inside the central safe area (8% margin on every side).
No text, no letters, no numbers, no formulas, no speech bubbles, no logos, no school uniform, no weapons, no real brands.
```

---

## E. 금지 표현 재검사 (2026-11-23)

저장소 adminmrobo/math_for_ai_lab 최신본(df214a4, v1.1) 전체 — `index.html`·`part2.html`·`part3.html`·`practice/index.html`·`assets/*.js`·`build/*.py`·`README.md`·`cover_manifest.json` — 과 이 프롬프트 파일을 검사했습니다.

| 검사 대상 | 결과 |
|---|---|
| 연구실 금지 표현 3종(사용자 지정, 붙은 꼴 포함) | 0건 — 표의 단위는 '가로줄·세로줄'로 씀 |
| 독자를 수학·통계 포기자로 부르는 줄임말 두 가지 | 0건 |
| 매출 기록을 옛 이름으로 부르는 표현 | 0건 |
| 유니코드 이스케이프로 숨은 꼴 | 0건 |

이 파일에는 금지 표현을 검사표에도 적지 않았고, 그림 프롬프트(영어)에도 그 뜻을 옮긴 표현을 쓰지 않았습니다.
