import type { RouterConfig } from '@nuxt/schema'
/**
 * 一番上に移動
 * @see https://debug-life.net/entry/4522
 */
export default <RouterConfig>{
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
}
