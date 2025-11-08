/**
 * ページネーションの表示ページ番号を生成する
 *
 * 総ページ数と現在のページ位置に基づいて、UIに表示すべきページ番号の配列を生成する
 * ページ数が多い場合は省略記号（'ellipsis'）を挿入する
 *
 * ## アルゴリズム
 * - 常に先頭ページ（1）と最終ページを表示
 * - 現在ページの前後1ページを表示（range: currentPage ± 1）
 * - 表示範囲と先頭/末尾の間にギャップがある場合は省略記号を挿入
 *
 * @param {number} currentPage - 現在のページ番号（1始まり）
 * @param {number} maxPage - 最大ページ番号（総ページ数）。1以上の整数
 * @returns {Array<number|"ellipsis">} 表示するページ番号の配列
 *   - 数値: クリック可能なページ番号
 *   - 'ellipsis': 省略記号（...）を表す文字列
 *
 * @example
 * // 1ページのみ
 * generatePageNumbers(1, 1)
 * // => [1]
 *
 * @example
 * // 5ページ、現在1ページ目（先頭）
 * generatePageNumbers(1, 5)
 * // => [1, 2, 'ellipsis', 5]
 *
 * @example
 * // 10ページ、現在5ページ目（中央）
 * generatePageNumbers(5, 10)
 * // => [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
 *
 * @example
 * // 10ページ、現在10ページ目（末尾）
 * generatePageNumbers(10, 10)
 * // => [1, 'ellipsis', 9, 10]
 *
 * @example
 * // 3ページの場合は省略なし
 * generatePageNumbers(2, 3)
 * // => [1, 2, 3]
 */
export const generatePageNumbers = (currentPage, maxPage) => {
	// 現在ページの前後1ページの範囲を計算
	const rangeStart = Math.max(2, currentPage - 1);
	const rangeEnd = Math.min(maxPage - 1, currentPage + 1);

	// 範囲内のページ番号を生成
	const middlePages = Array.from(
		{ length: rangeEnd - rangeStart + 1 },
		(_, i) => rangeStart + i,
	);

	// 最初のページ、省略記号、範囲内、省略記号、最後のページを結合
	return [
		1,
		...(rangeStart > 2 ? ["ellipsis"] : []),
		...middlePages,
		...(rangeEnd < maxPage - 1 ? ["ellipsis"] : []),
		...(maxPage > 1 ? [maxPage] : []),
	];
};
