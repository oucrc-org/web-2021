import client from '~/server/micro-cms'
import type { Article } from '~/types/micro-cms'
import { addHljsClassToHtml } from '~/composables/highlight'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const article = await client.get<Article>({
    endpoint: 'article',
    contentId: id,
  })
  const body = addHljsClassToHtml(article.body)
  const otherArticles = await client.getList<Article>({
    endpoint: 'article',
    queries: {
      filters: `name[equals]${article.name.id}[and]id[not_equals]${article.id}`,
      limit: 3,
    },
  })
  const recommendArticles = await client.getList<Article>({
    endpoint: 'article',
    queries: {
      filters: `id[not_equals]${article.id}`,
      limit: 4,
    },
  })
  return {
    article: {
      ...article,
      // HTMLのコードにhljsクラスを追加する
      body,
    },
    otherArticles,
    recommendArticles,
  }
})
