import client from '~/server/micro-cms'
import { Member } from '~/types/micro-cms'
export default defineEventHandler(async (event) => {
  const queries = getQuery(event)

  return await client
    .getList<Member>({
      endpoint: 'member',
      queries,
    })
    .then((data) => {
      /**
       * @example
       * ```ts
       * {年: [部員,部員,...],年: [部員,部員,...],...}
       * ```
       */
      let membersByYear: Record<string, Member[]> = {}
      data.contents.forEach((member) => {
        if (!membersByYear[member['enteryear']]) {
          membersByYear[member['enteryear']] = []
        }
        membersByYear[member['enteryear']].push(member)
      })
      const sortedYears = Object.keys(membersByYear).sort((a, b) => {
        return Number(b) - Number(a)
      })
      let result: Record<string, Member[]> = {}
      // フロントに渡した際ソートされるのでサーバーサイドで文字にして固定
      sortedYears.forEach((y) => (result[` ${y} `] = membersByYear[y]))
      return result
    })
})
