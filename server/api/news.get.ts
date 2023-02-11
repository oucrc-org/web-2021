import { News } from '~/types/micro-cms'
import client from '../micro-cms'
export default defineEventHandler(async (event) => {
  const queries = getQuery(event)
  return await client.getList<News>({
    endpoint: 'news',
    queries,
  })
})
