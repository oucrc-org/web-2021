/**
 * 入部フォーム
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url =
    'https://docs.google.com/forms/u/0/d/e/1FAIpQLSds9xqdBsruaabapqvRkaW1gV10pv9lOJNasLCv5CHDZokdwQ/formResponse'
  const fd = new FormData()
  fd.append('entry.1552183669', query.studentNumber?.toString() ?? '')
  fd.append('entry.514745000', query.realName?.toString() ?? '')
  fd.append('entry.821989733', query.email?.toString() ?? '')
  fd.append('entry.793184820', query.phone?.toString() ?? '')
  fd.append('entry.1050056731', query.nickname?.toString() ?? '')
  fd.append('entry.528663940', query.hobby?.toString() ?? '')
  fd.append('entry.1197263570', query.comment?.toString() ?? '')

  return await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: fd,
  })
    .then(() => {
      return true
    })
    .catch((e) => {
      throw new Error(e)
    })
})
