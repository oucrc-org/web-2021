import client from '~/server/micro-cms'
import { Article, Member } from '~/types/micro-cms'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const member = await client.get<Member>({
    endpoint: 'member',
    contentId: id,
  })
  const articles = await client.getList<Article>({
    endpoint: 'article',
    queries: {
      limit: 12,
      filters: `name[equals]${id}`,
    },
  })
  return { member, articles }
})
