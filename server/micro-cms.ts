import { createClient } from 'microcms-js-sdk'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

/**
 * サーバーサイドのAPIでこれを使う
 */
const client = createClient({
  serviceDomain: config.API_URL,
  apiKey: config.MICROCMS_API_KEY,
})
export default client
