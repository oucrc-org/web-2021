import { createClient } from 'microcms-js-sdk'

const config = useRuntimeConfig()

/**
 * サーバーサイドのAPIでこれを使う
 */
const client = createClient({
  serviceDomain: config.MICROCMS_SERVICE_DOMAIN,
  apiKey: config.MICROCMS_API_KEY,
})
export default client
