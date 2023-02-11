import * as cheerio from 'cheerio'
import hljs from 'highlight.js/lib/core'

/**
 * HTMLのコードにhljsクラスを追加する SSR対応
 * スタイルは記事コンポーネントのCSSで決定する
 * @see https://blog.microcms.io/syntax-highlighting-on-server-side/
 */
export const addHljsClassToHtml = async (html: string) => {
  const parsed = cheerio.load(html)
  parsed('pre code').each((_, el) => {
    const result = hljs.highlightAuto(parsed(el).text())
    parsed(el).html(result.value)
    parsed(el).addClass('hljs')
  })
  return parsed.html()
}
