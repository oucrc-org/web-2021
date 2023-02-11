import client from '~/server/micro-cms'
export default defineEventHandler(async (event) => {
  // const queries = getQuery(event)
  return await client.getList({
    endpoint: 'article',
    // queries,
  })
})
