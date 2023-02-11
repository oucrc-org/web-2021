import client from '~/server/micro-cms'
import { News } from '~/types/micro-cms'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  return await client.get<News>({
    endpoint: 'news',
    contentId: id,
  })
})
