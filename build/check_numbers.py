# -*- coding: utf-8 -*-
"""본문 '숫자로 한 번 해 보기'와 풀이에 쓴 값을 다시 계산해 확인한다. python3 build/check_numbers.py"""
import json, math, os
import numpy as np
D = json.load(open(os.path.join(os.path.dirname(__file__), "data.json")))
L, H, W = np.array(D["perch"]).T
ok = 0
def chk(name, got, want, tol=1e-3):
    global ok
    assert abs(got - want) <= tol, f"{name}: {got} != {want}"
    ok += 1
# 1장
x = np.array([2, 2.5, 3, 3.5, 4.]); y = np.array([.8, 1.5, 2.6, 4.2, 6.3])
chk("1장 직선 예", 2.6 * 3 - 4.9, 2.9); chk("1장 2차 예", .5 * 9 - 1.7, 2.8)
chk("1장 직선 오차합", abs(2.6 * x - 4.9 - y).sum(), 1.7, 1e-6); chk("1장 2차 오차합", abs(.5 * x * x - 1.7 - y).sum(), 1.0, 1e-6)
# 3장
chk("3장 내적", np.dot([1, 2, 3], [4, 5, 6]), 32); chk("3장 노름", math.hypot(3, 4), 5)
chk("3장 생선 코사인", np.dot([30, 8], [15, 4]) / (math.hypot(30, 8) * math.hypot(15, 4)), 1.0, 1e-3)
# 4장
A = np.array([[1, 2, 3], [4, 5, 6]]); B = np.array([[7, 8], [9, 10], [11, 12]])
assert (A @ B == np.array([[58, 64], [139, 154]])).all(); ok += 1
chk("4장 역행렬 det", np.linalg.det([[2, 1], [1, 2]]), 3)
S = np.array(D["perch"])[[0, 4, 9, 13, 17, 22]]; X = np.c_[S[:, 0], S[:, 1], np.ones(6)]; w = np.linalg.lstsq(X, S[:, 2], rcond=None)[0]
chk("4장 최소제곱 w1", w[0], -11.8, 0.05); chk("4장 최소제곱 w2", w[1], 141.7, 0.05)
chk("4장 직선 한계 MAE", np.abs(26 * S[:, 0] - 460 - S[:, 2]).mean(), 62.8, 0.05)
# 5장
Am = np.array([[2, 3], [1, -1]]); chk("5장 det", np.linalg.det(Am), -5)
sol = np.linalg.solve(Am, [7, 1]); chk("5장 x", sol[0], 2); chk("5장 y", sol[1], 1)
Xd = np.c_[np.ones(3), [1, 2, 3]]; b = np.linalg.solve(Xd.T @ Xd, Xd.T @ np.array([2, 3, 5.])); chk("5장 기울기", b[1], 1.5); chk("5장 절편", b[0], 1 / 3)
xs = np.array([5, 5.1, 4.9, 5, 5.1]); chk("5장 모은 점 det", 5 * (xs ** 2).sum() - xs.sum() ** 2, 0.14, 1e-6)
# 6장
d = np.array([2, 4, 6, 8, 10.]); chk("6장 분산", d.var(), 8); chk("6장 표준편차", d.std(), 2.828, 1e-3)
chk("6장 평균 이동", np.append(L, 150).mean() - L.mean(), 4.8, 0.01); chk("6장 중앙값 이동", np.median(np.append(L, 150)) - np.median(L), 0.75, 1e-6)
chk("6장 표준편차 예시", L.std(), 8.5, 0.05)
# 7장
X7 = np.array([1, 2, 3, 4, 5.]); Y7 = np.array([2, 4, 5, 4, 5.])
chk("7장 공분산", np.mean((X7 - 3) * (Y7 - 4)), 1.2); chk("7장 상관", np.corrcoef(X7, Y7)[0, 1], 0.775, 1e-3)
chk("7장 길이-높이", np.corrcoef(L, H)[0, 1], 0.99, 0.005); chk("7장 날짜", np.corrcoef(L, D["bday"])[0, 1], 0.12, 0.01)
# 8장
r = np.corrcoef(L, H)[0, 1]; ev = np.linalg.eigvalsh(np.array([[1, r], [r, 1]]))
chk("8장 λ1", ev[1], 1.992, 1e-3); chk("8장 λ2", ev[0], 0.008, 1e-3); chk("8장 비율", ev[1] / 2, 0.996, 1e-3)
# 9장
chk("9장 합집합", 3 / 6 + 3 / 6 - 1 / 6, 5 / 6); chk("9장 빙어", 10 / 22, 0.455, 1e-3); chk("9장 두번 도미", (12 / 22) ** 2, 0.298, 1e-3)
# 10장
chk("10장 공", 4 / 7, 0.571, 1e-3); pT = .99 * .01 + .05 * .99; chk("10장 P(양성)", pT, 0.0594); chk("10장 사후", .0099 / pT, 0.167, 1e-3)
# 11장
chk("11장 이항", math.comb(5, 2) * .5 ** 5, 0.3125); chk("11장 포아송", math.exp(-3) * 9 / 2, 0.2240, 1e-4)
chk("11장 균등", 6 / 10, 0.6); chk("11장 지수", math.exp(-1.5), 0.2231, 1e-4); chk("11장 손님 평균", np.mean(D["cust"]), 2.6, 0.05)
# 12장
chk("12장 0.87", -math.log(.87), 0.139, 1e-3); chk("12장 0.51", -math.log(.51), 0.673, 1e-3); chk("12장 0.01", -math.log(.01), 4.605, 1e-3)
chk("12장 최대 엔트로피", math.log2(3), 1.585, 1e-3)
# 13·14장
chk("13장 적분", 0.5, 1 / 2); chk("14장 그래디언트 x", 2 * 1 * 2 + 3 * 2, 10); chk("14장 그래디언트 y", 1 + 3 + 2 * 2, 8)
chk("14장 접평면", 5 + 2 * (0 - 1) + 4 * (0 - 2), 2 * 0 + 4 * 0 - 5); chk("14장 안정 조건", 2 / 25, 0.08)
# 15장
chk("15장 수렴", 0.91 ** 60, 0.0035, 1e-4)
# 16장 (학습 16 / 검증 8 — 셋째 마리마다 검증)
te = np.arange(24) % 3 == 2; tr = ~te
def mae_te(col):
    X = np.array(col); mu, s_ = X[tr].mean(), X[tr].std(); Z = (X - mu) / s_
    A = np.c_[np.ones(24), Z]; bb = np.linalg.lstsq(A[tr], W[tr], rcond=None)[0]; return np.abs(A[te] @ bb - W[te]).mean(), np.abs(A[tr] @ bb - W[tr]).mean()
chk("16장 길이만(검증)", mae_te(L)[0], 32.9, 0.05); chk("16장 길이³(검증)", mae_te(L ** 3)[0], 25.4, 0.05); chk("16장 길이³(학습)", mae_te(L ** 3)[1], 14.4, 0.05)
# 대결
tx = np.array([4.8, 4.9, 5.0, 5.1, 5.2]); ty = 0.9 * tx + 0.5 + np.array([0.6, -0.5, 0.3, -0.6, 0.4]); sxx = np.array([1, 3, 5, 7, 9.])
def ridge(Lm):
    A = np.array([[5 + Lm, tx.sum()], [tx.sum(), (tx * tx).sum() + Lm]]); b0, b1 = np.linalg.solve(A, [ty.sum(), (tx * ty).sum()]); return np.abs(b0 + b1 * sxx - (0.9 * sxx + 0.5)).mean()
chk("1부 대결 릿지", ridge(0.5), 0.15, 0.005); chk("1부 대결 보통", ridge(0), 1.21, 0.005)
print(f"검산 {ok}개 모두 통과")
