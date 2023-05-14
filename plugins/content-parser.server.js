import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
// import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'

import dart from 'highlight.js/lib/languages/dart'
import powershell from 'highlight.js/lib/languages/powershell'

/**
 * 設定不要でハイライト可能な言語一覧▼
 * @see https://github.com/wooorm/lowlight#syntaxes
 * もし上記以外に必要なら、以下のように追加できる
 */
const languages = { dart, powershell }
/**
 * HTMLをパースし、コードに適切なclassを付与する
 * 表示にはhighlight.jsのCSSが必要
 * HTMLにTeXを混ぜていてややこしいため、数式はクライアントサイドで描画する
 *
 * @see https://dev.classmethod.jp/articles/2020-04-15-conv-html-use-rehype/
 * @see https://github.com/rehypejs/rehype-highlight
 */
async function parseHtml(html) {
  const parsed = await unified()
    // まずHTMLをパースする
    .use(rehypeParse, { fragment: true })
    // YouTubeのiframeを消してしまわないように
    // 以下のオプションだと中見が消えてしまうので保留
    // TODO: YouTubeに対応しつつサニタイズ
    // .use(rehypeSanitize, { tagNames: ['iframe'] })

    // コードにハイライトを適用する
    .use(rehypeHighlight, {
      detect: true,
      // デフォルト以外の検知可能言語を追加
      languages,
    })
    .use(rehypeStringify)
    .process(html)

  return parsed.toString()
}

/**
 * MarkdownをパースしてHTMLに
 * こちらなら言語をコードブロックで指定可能
 */
async function parseMarkdown(markdown) {
  const parsed = await unified()
    // まずMDをパースする
    .use(remarkParse)
    // GFM (脚注や打ち消し線、テーブル、ToDoリスト)
    .use(remarkGfm)
    .use(remarkRehype)
    // コードにハイライトを適用する
    .use(rehypeHighlight, {
      detect: true,
      // デフォルト以外の検知可能言語を追加
      languages,
    })
    .use(rehypeStringify)
    .process(markdown)

  return parsed.toString()
}

function parser(source, { isMarkdown } = { isMarkdown: false }) {
  return isMarkdown ? parseMarkdown(source) : parseHtml(source)
}

export default (context, inject) => {
  inject('contentParser', parser)
  context.$contentParser = parser
}
