import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

/**
 * 日付のフォーマット等に使用
 * @example ```
 * this.$dayjs().format('YYYY/MM/DD')
 * ```
 * [dayjsモジュール](https://github.com/nuxt-community/dayjs-module)が使えなかったので、手動でを定義
 * @see https://nuxtjs.org/docs/directory-structure/plugins/#inject-in-root--context
 */
export default (context, inject) => {
  dayjs.locale('ja')
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault('Asia/Tokyo')
  inject('dayjs', dayjs)
  context.$dayjs = dayjs
}
