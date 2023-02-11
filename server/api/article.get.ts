import client from '~/server/micro-cms'
import { Article, Category, Series } from '~/types/micro-cms'
export default defineEventHandler(async (event) => {
  const queries = getQuery(event)
  const articles = await client.getList<Article>({
    endpoint: 'article',
    queries,
  })
  const categories = await client.getList<Category>({
    endpoint: 'category',
    queries: { limit: 1000, fields: 'id,category' },
  })
  const serieses = await client.getList<Series>({
    endpoint: 'series',
    queries: { limit: 100, fields: 'id,series', orders: 'createdAt' },
  })
  return { articles, categories, serieses }
})
