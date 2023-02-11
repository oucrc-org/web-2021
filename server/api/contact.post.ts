/**
 * 問い合わせフォーム
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url =
    'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfnY2gyQ5P2lVdMZri-vudGDYwUHHtZ0yo7_2Cg4aeqs7VjJw/formResponse'
  const fd = new FormData()
  fd.append('entry.514745000', query.name?.toString() ?? '')
  fd.append('entry.821989733', query.email?.toString() ?? '')
  fd.append('entry.1197263570', query.body?.toString() ?? '')

  return await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: fd,
  })
    .then((res) => {
      return true
    })
    .catch((e) => {
      throw new Error(e)
    })
})
