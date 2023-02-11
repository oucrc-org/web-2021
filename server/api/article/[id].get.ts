import client from '~/server/micro-cms'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (typeof id === 'string') {
    return await client.get({
      endpoint: 'article',
      contentId: id,
    })
  } else {
    return null
  }
})
