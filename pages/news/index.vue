<template>
  <section class="container mx-auto">
    <OGPSetter
      title="お知らせ"
      description="OUCRC（岡山大学電子計算機研究会）のからのお知らせ一覧です！"
      :url="this.$route.path"
    />

    <div class="lg:grid grid-cols-4 xl:grid-cols-5 gap-24 mt-16 px-8">
      <div class="col-span-2 xl:col-span-3">
        <News :notices="notices" />
      </div>
      <div class="col-span-2 mt-32 lg:mt-0">
        <a
          class="twitter-timeline"
          data-width="1200"
          data-theme="light"
          href="https://twitter.com/oucrc?ref_src=twsrc%5Etfw"
          >Tweets by oucrc</a
        >
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      notices: {
        contents: [],
      },
    }
  },
  asyncData({ $config }) {
    const currentTime = new Date().toISOString()
    return axios
      .get(`${$config.API_URL}/news`, {
        headers: {
          'X-MICROCMS-API-KEY': $config.MICROCMS_API_KEY,
        },
        params: {
          limit: 1000,
          fields: 'id,title',
          orders: '-important,-date,-createdAt',
          filters: `date[less_than]${currentTime}`,
        },
      })
      .then((response) => {
        return {
          notices: response.data,
        }
      })
      .catch(function () {
        return {
          notices: null,
        }
      })
  },
}
</script>
