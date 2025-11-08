import { describe, test, expect } from "vitest";
import { generatePageNumbers } from "./pagination.js";

describe("generatePageNumbers", () => {
	describe("エッジケース: 総ページ数の境界値", () => {
		test("1ページのみ: 最小の特殊ケース", () => {
			expect(generatePageNumbers(1, 1)).toEqual([1]);
		});

		test("2ページ: 最小の複数ページケース", () => {
			// 先頭ページ
			expect(generatePageNumbers(1, 2)).toEqual([1, 2]);
			// 最終ページ
			expect(generatePageNumbers(2, 2)).toEqual([1, 2]);
		});
	});

	describe("省略記号の出現パターン", () => {
		describe("パターンA: 省略なし（総ページ数が少ない）", () => {
			test("3ページ: 全て表示", () => {
				expect(generatePageNumbers(1, 3)).toEqual([1, 2, 3]);
				expect(generatePageNumbers(2, 3)).toEqual([1, 2, 3]);
				expect(generatePageNumbers(3, 3)).toEqual([1, 2, 3]);
			});

			test("4ページ/現在2-3ページ目: 中央では全て表示", () => {
				expect(generatePageNumbers(2, 4)).toEqual([1, 2, 3, 4]);
				expect(generatePageNumbers(3, 4)).toEqual([1, 2, 3, 4]);
			});
		});

		describe("パターンB: 後ろに省略記号（先頭付近）", () => {
			test("4ページ/現在1ページ目: [1, 2, ..., 4]", () => {
				expect(generatePageNumbers(1, 4)).toEqual([1, 2, "ellipsis", 4]);
			});

			test("5ページ/現在1ページ目: [1, 2, ..., 5]", () => {
				expect(generatePageNumbers(1, 5)).toEqual([1, 2, "ellipsis", 5]);
			});

			test("5ページ/現在2ページ目: [1, 2, 3, ..., 5]", () => {
				expect(generatePageNumbers(2, 5)).toEqual([1, 2, 3, "ellipsis", 5]);
			});

			test("10ページ/現在1ページ目: [1, 2, ..., 10]", () => {
				expect(generatePageNumbers(1, 10)).toEqual([1, 2, "ellipsis", 10]);
			});

			test("10ページ/現在2ページ目: [1, 2, 3, ..., 10]", () => {
				expect(generatePageNumbers(2, 10)).toEqual([1, 2, 3, "ellipsis", 10]);
			});
		});

		describe("パターンC: 前に省略記号（末尾付近）", () => {
			test("4ページ/現在4ページ目: [1, ..., 3, 4]", () => {
				expect(generatePageNumbers(4, 4)).toEqual([1, "ellipsis", 3, 4]);
			});

			test("5ページ/現在4ページ目: [1, ..., 3, 4, 5]", () => {
				expect(generatePageNumbers(4, 5)).toEqual([1, "ellipsis", 3, 4, 5]);
			});

			test("5ページ/現在5ページ目: [1, ..., 4, 5]", () => {
				expect(generatePageNumbers(5, 5)).toEqual([1, "ellipsis", 4, 5]);
			});

			test("10ページ/現在8ページ目: [1, ..., 7, 8, 9, 10]", () => {
				expect(generatePageNumbers(8, 10)).toEqual([
					1,
					"ellipsis",
					7,
					8,
					9,
					10,
				]);
			});

			test("10ページ/現在9ページ目: [1, ..., 8, 9, 10]", () => {
				expect(generatePageNumbers(9, 10)).toEqual([1, "ellipsis", 8, 9, 10]);
			});

			test("10ページ/現在10ページ目: [1, ..., 9, 10]", () => {
				expect(generatePageNumbers(10, 10)).toEqual([1, "ellipsis", 9, 10]);
			});
		});

		describe("パターンD: 前後に省略記号（中央）", () => {
			test("7ページ/現在4ページ目: 省略2つが出る最小ケース", () => {
				// 7ページで現在4ページ目が、省略が両方出る最小のケース
				expect(generatePageNumbers(4, 7)).toEqual([
					1,
					"ellipsis",
					3,
					4,
					5,
					"ellipsis",
					7,
				]);
			});

			test("10ページ/現在4ページ目: [1, ..., 3, 4, 5, ..., 10]", () => {
				expect(generatePageNumbers(4, 10)).toEqual([
					1,
					"ellipsis",
					3,
					4,
					5,
					"ellipsis",
					10,
				]);
			});

			test("10ページ/現在5ページ目: [1, ..., 4, 5, 6, ..., 10]", () => {
				expect(generatePageNumbers(5, 10)).toEqual([
					1,
					"ellipsis",
					4,
					5,
					6,
					"ellipsis",
					10,
				]);
			});

			test("10ページ/現在6ページ目: [1, ..., 5, 6, 7, ..., 10]", () => {
				expect(generatePageNumbers(6, 10)).toEqual([
					1,
					"ellipsis",
					5,
					6,
					7,
					"ellipsis",
					10,
				]);
			});

			test("10ページ/現在7ページ目: [1, ..., 6, 7, 8, ..., 10]", () => {
				expect(generatePageNumbers(7, 10)).toEqual([
					1,
					"ellipsis",
					6,
					7,
					8,
					"ellipsis",
					10,
				]);
			});
		});
	});

	describe("境界値: 省略なし→省略ありの遷移", () => {
		test("5ページ/現在3ページ目: 省略が消える境界", () => {
			// 5ページの中央では省略記号が出ない
			expect(generatePageNumbers(3, 5)).toEqual([1, 2, 3, 4, 5]);
		});

		test("10ページ/現在3ページ目: 後ろの省略のみ", () => {
			// 先頭付近から中央へ移動する境界
			expect(generatePageNumbers(3, 10)).toEqual([1, 2, 3, 4, "ellipsis", 10]);
		});
	});

	describe("実用的なケース: 大きなページ数", () => {
		test("100ページ/現在1ページ目: 先頭", () => {
			expect(generatePageNumbers(1, 100)).toEqual([1, 2, "ellipsis", 100]);
		});

		test("100ページ/現在50ページ目: 中央", () => {
			expect(generatePageNumbers(50, 100)).toEqual([
				1,
				"ellipsis",
				49,
				50,
				51,
				"ellipsis",
				100,
			]);
		});

		test("100ページ/現在100ページ目: 末尾", () => {
			expect(generatePageNumbers(100, 100)).toEqual([1, "ellipsis", 99, 100]);
		});
	});
});
