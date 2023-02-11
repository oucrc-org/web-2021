import client from '../micro-cms'
export default defineEventHandler(async (event) => {
  // const queries = getQuery(event)
  return await client.getList({
    endpoint: 'news',
    // queries,
  })
})
