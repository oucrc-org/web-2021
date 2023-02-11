import client from '~/server/micro-cms'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (typeof id === 'string') {
    const member = await client.get({
      endpoint: 'member',
      contentId: id,
    })
    const articles = await client.getList({
      endpoint: 'article',
      queries: {
        limit: 12,
        filters: `name[equals]${id}`,
      },
    })
    return { member, articles }
  } else {
    return null
  }
})
