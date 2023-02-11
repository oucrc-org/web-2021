import client from '~/server/micro-cms'
import type { Article } from '~/types/micro-cms'
import { addHljsClassToHtml } from '~/composables/highlight'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (typeof id === 'string') {
    const data = await client.get<Article>({
      endpoint: 'article',
      contentId: id,
    })
    const body = await addHljsClassToHtml(data.body)
    return {
      ...data,
      // HTMLのコードにhljsクラスを追加する
      body,
    }
  } else {
    return null
  }
})
