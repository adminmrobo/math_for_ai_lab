# 젠스파크용 그림 프롬프트 — 인공지능을 위한 수학 (픽셀풍 · 기본 규칙)

연구실 해설 기본 규칙(16비트 RPG 픽셀아트, 낮의 연구실, 흰 배경)을 첫머리·캐릭터 줄·끝머리에 미리 합쳐 둔 완성본입니다. 블록 하나를 통째로 붙여 넣으면 됩니다.

- 참고 그림: fruitfly-lab-expressions에서 표에 적은 캐릭터의 표정 그림을 함께 올립니다.
- 순서: **1부 표지를 먼저** 받아 그림체를 확인한 뒤, 그 표지를 참고 그림으로 같이 올려 나머지를 요청합니다. 한 대화에 3~5장씩, 같은 비율끼리 묶습니다.
- 저장: 표지 1600×900 → `assets/cover/cover_part1~3.webp`, 장면 1200×800 → `assets/scenes/scene_00~16.webp`, WebP. 줄일 때는 '가장 가까운 이웃' 방식(픽셀이 뭉개지지 않게).
- 반영: 파일을 그 자리에 넣고 `python3 build/build.py`를 돌리면 표지는 CSS 대체 표지 위에, 장면 그림은 각 장 제목 아래에 자동으로 들어갑니다. 공유 미리보기(`assets/og/`)는 표지에서 1200×630으로 잘라 바꿉니다.
- 그림 속 글자·숫자·수식은 넣지 않습니다(생성 도구가 틀리게 쓰기 쉬움). 공식은 페이지 본문이 맡습니다.
- 금지 표현 검사: 이 파일의 한국어 설명에도 연구실 금지 표현을 쓰지 않았습니다.

## 캐릭터 줄 (프롬프트에 그대로 들어가 있음)
| 캐릭터 | 영어 묘사 | 참고 파일 |
|---|---|---|
| 시아 | a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow | images/sia/ |
| 모아 | a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan | images/moa/ |
| 조수 하루 | a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie | images/haru/ |
| 박사 | a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie | images/doctor/ |
| 초파리 연구원 | an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings | images/fruitfly/ |
| 주판봇 | a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads | images/jupanbot/ |
| X1~X3 | three small cute spare characters drawn as solid black silhouettes with round white eyes, sitting in audience chairs | images/x1~x3/ |

---

## 1. 1부 표지 — cover_part1.webp (16:9) · index.html
참고: 시아 E19, 모아 E09, 조수 하루 E20, 박사 E08
```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory mood, soft natural sunlight, clean white walls, teal, orange and navy accents.
Scene: on the white floor of the lab, fifteen blank formula cards are spread out in three rows, connected to each other by thin teal threads like a map. A small wooden fish-shop crate with a few silver fish sits at the edge.
A calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, sparkling eyes, tying a teal thread between two cards; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking with a finger on her chin, holding the other end of the thread; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, nervous with a drop of sweat, holding one silver fish in both hands; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, pointing at the card map.
Mood: the start of a study adventure, calm and bright.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no logos, no school uniform, no weapons, no real brands.
```

## 2. 2부 표지 — cover_part2.webp (16:9) · part2.html
참고: 모아 E09, 주판봇 E16, 초파리 연구원 E09, 시아 E01
```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory mood, soft natural sunlight, clean white walls, teal, orange and navy accents.
Scene: a fish-shop counter inside the bright lab; a large pixel balance scale holds silver fish on one side; beside it, three tall glowing bars of different heights stand like a bar chart, and a cloud of small teal dots floats in the air forming a slanted oval.
A boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, proudly pushing up the tallest bar; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, looking at the dot cloud through a magnifying glass; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, happy, weighing a fish.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no logos, no school uniform, no weapons, no real brands.
```

## 3. 3부 표지 — cover_part3.webp (16:9) · part3.html
참고: 조수 하루 E19, 박사 E10, 시아 E16, 모아 E19
```
Website top cover illustration, wide 16:9.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory mood, soft natural sunlight, clean white walls, teal, orange and navy accents.
Scene: a giant pixel contour map is painted on the lab floor like a shallow bowl, with nested teal oval rings; an orange ball rolls down along a dotted zigzag path toward the glowing center; a small checkered finish flag stands at the center.
A girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, sparkling eyes, gently pushing the ball; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, waiting at the finish flag with a calm thumbs-up; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, proud; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, sparkling eyes, cheering.
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom); keep the right third plain and bright for title text.
No text, no letters, no numbers, no logos, no school uniform, no weapons, no real brands.
```

---

## 4~20. 장면 그림 — scene_00~16.webp (3:2)
아래 블록에서 Scene 줄만 장마다 바꿉니다. 장면 줄에는 캐릭터 영어 묘사를 이미 넣어 두었습니다.
```
Scene illustration 3:2.
Match the art style, proportions and colors of the attached reference images exactly (if there are no reference images: 16-bit RPG style pixel art, bold dark outline, 2-3 tone shading, small highlights).
Bright daytime laboratory mood, soft natural sunlight, clean white walls, teal, orange and navy accents.
Scene: [아래 표의 장면 줄]
Composition: keep every face and hand inside the central safe area (12% margin left and right, 10% top, 18% bottom).
No text, no letters, no numbers, no logos, no school uniform, no weapons, no real brands.
```

| 장 | 파일 | Scene 줄 | 참고 표정 |
|---|---|---|---|
| 0 | scene_00 | A chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, unrolls a large blank map on a white table; on the map, blank cards are joined by teal lines. A girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, nervous with a drop of sweat; three small cute spare characters drawn as solid black silhouettes with round white eyes sit in audience chairs behind, one of them waving a tiny cheering stick. | 박사 E08, 하루 E20, X1 E04 |
| 1 | scene_01 | A pixel vending machine in the lab: a silver fish goes into the slot on top and a small weight tag drops out at the bottom. A calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, happy, inserting the fish; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, explaining with one hand raised. | 시아 E01, 하루 E07 |
| 2 | scene_02 | A large wall spreadsheet made of blank glowing rows and columns; each row holds a small fish icon. A gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, placing a fish into a new row, thinking; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, counting rows with her finger. | 모아 E09, 시아 E13 |
| 3 | scene_03 | Two glowing arrows (blue and green) start from the same corner of a floor grid; a dashed line joins their tips and a small orange angle arc sits between them. A calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, measuring the dashed line with a ruler; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, holding a protractor at the angle. | 시아 E19, 모아 E09 |
| 4 | scene_04 | A small pixel factory conveyor: a stack of fish cards goes into a box-shaped machine with two lever weights on top, and a neat stack of weight tags comes out the other side. A boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, operating the levers proudly; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, pointing at a jammed gear with a warning look. | 주판봇 E16, 초파리 E09 |
| 5 | scene_05 | Five glowing dots on a floor grid with an orange straight line through them; next to it, the same dots squeezed into one vertical column and a wobbling red line, and a small teal stabilizer weight being placed on it. A gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, placing the stabilizer weight, confident; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, surprised at the wobbling line. | 모아 E10, 시아 E04 |
| 6 | scene_06 | A row of silver fish lined up by size on a long white table, one absurdly giant fish at the far end; above them a floating box-plot shape and a red dashed fence line. A calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, shocked at the giant fish; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, explaining calmly with a pointer. | 시아 E24, 하루 E07 |
| 7 | scene_07 | A scatter of teal dots on a wall forms a tight slanted line, while another wall shows randomly scattered dots. A gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, comparing the two walls, thinking; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, embarrassed with a drop of sweat. | 모아 E09, 주판봇 E20 |
| 8 | scene_08 | An oval cloud of teal dots floats in the air; a pixel flashlight shines on it from one side and casts a long orange shadow line on the wall. A girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, rotating the flashlight; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, measuring the shadow length, sparkling eyes. | 하루 E08, 모아 E19 |
| 9 | scene_09 | A clear glass tank with red sea bream and small silver smelt swimming; a little scoop net draws one fish out. A calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, holding the scoop net, excited; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, tallying with abacus beads. | 시아 E19, 주판봇 E07 |
| 10 | scene_10 | A pixel medical test booth in the lab with a long line of tiny people icons; a few lamps above them glow red and many glow orange. A gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, thinking deeply; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, surprised; a chibi scientist with thin teal rectangular glasses, spiky black hair with one white streak, small ponytail at the back, white lab coat over black vest and tie, calmly explaining with a small chart. | 모아 E09, 시아 E04, 박사 E07 |
| 11 | scene_11 | Three wooden display stands at the fish shop: one with a bell-shaped curve of fish lengths, one with stacked customer bars, one with a stopwatch and a sloping curve. A girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, placing a curved transparent template over the bars; an anthropomorphic fruit fly researcher, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings, holding up a pixel arrow sign as if saying "try pressing this". | 하루 E07, 초파리 E09 |
| 12 | scene_12 | A large pixel balance scale, one pan holding a single glowing correct-answer fish and the other pan holding three wobbling probability blocks of different heights; small surprise sparks pop above the lighter pan. A calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, surprised by the sparks; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, carefully adjusting the blocks. | 시아 E04, 모아 E10 |
| 13 | scene_13 | A pixel magnifying glass hovers over a smooth curved hill drawn on the lab floor; under the glass, the curve looks almost straight and a small green tangent line touches it. A girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, holding the magnifying glass; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, crouching to look, sparkling eyes. | 하루 E08, 시아 E19 |
| 14 | scene_14 | A foggy pixel mountain slope with nested contour rings; a small hiker figure takes careful steps downhill following red footprints toward a glowing star at the bottom. A gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, holding a compass and pointing downhill; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, bouncing away off the slope after a too-big jump, flustered. | 모아 E08, 주판봇 E15 |
| 15 | scene_15 | Three racers slide down a long narrow valley at the same time: a careful walker zigzagging, a sled gliding smoothly, and a small pixel car with adjustable wheels. A calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, riding the sled, excited; a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, driving the little car calmly; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, waving a referee flag at the bottom. | 시아 E19, 모아 E13, 하루 E10 |
| 16 | scene_16 | Lab duel at the fish shop counter: a gentle girl intern with long ash-beige wavy hair, white frilled maid headband, camel cardigan, proud, next to a neat scale showing a balanced pan; a calm girl intern with long straight jet-black hair, charcoal-black maid dress with large gray bow, sheepish, next to a scale with springs popping out; a girl researcher with long pink hair with two round buns and a navy streak, blue eyes, white lab coat over lavender hoodie, as referee, raising a small flag toward the gentle intern; a boxy beige retro CRT-monitor robot, dark green screen face with mint pixel eyes and mouth, short antenna topped with a red-brown abacus bead, gray segmented arms, two small tank treads, sheepish; three small cute spare characters drawn as solid black silhouettes with round white eyes clapping in audience chairs. | 모아 E16, 시아 E14, 하루 E10, 주판봇 E14, X1~X3 E01 |

> 16장 아웃트로 표정은 대결 결과(모아 승)와 맞춰 두었습니다. 결과가 바뀌면 표정만 편집으로 다시 요청합니다.
