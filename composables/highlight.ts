import * as cheerio from 'cheerio'
import hljs from 'highlight.js/lib/core'

/**
 * 以下を登録しなければ最適化により検出できなくなってしまう
 */
import shell from 'highlight.js/lib/languages/shell'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import kotlin from 'highlight.js/lib/languages/kotlin'
import go from 'highlight.js/lib/languages/go'
import csharp from 'highlight.js/lib/languages/csharp'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('python', python)
hljs.registerLanguage('kotlin', kotlin)
hljs.registerLanguage('java', java)
hljs.registerLanguage('go', go)
hljs.registerLanguage('csharp', csharp)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)

/**
 * HTMLのコードにhljsを適用する SSR対応
 * スタイルは記事コンポーネントのCSSで決定する
 * @see https://blog.microcms.io/syntax-highlighting-on-server-side/
 */
export const addHljsClassToHtml = (html: string) => {
  const parsed = cheerio.load(html)
  parsed('pre code').each((_, el) => {
    const result = hljs.highlightAuto(parsed(el).text())
    parsed(el).html(result.value)
    parsed(el).addClass('hljs')
  })
  return parsed.html()
}
