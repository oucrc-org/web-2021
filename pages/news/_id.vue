<template>
  <div class="container mx-auto">
    <OGPSetter
      :title="article.title"
      :description="article.body"
      :url="this.$route.path"
      :image="typeof article.image !== 'undefined' ? article.image.url : null"
    />
    <div class="my-16">
      <!---------------------------------------------------  メイン  --------------------------------------------------->

      <ArticleContent :article="article" :timeUpdated="timeUpdated" />

      <!---------------------------------------------------  メイン  --------------------------------------------------->
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      article: 'There are no data',
      timeUpdated: '',
    }
  },
  asyncData({ params, error, $config, $dayjs }) {
    return axios
      .get(`${$config.API_URL}/news/${params.id}`, {
        headers: {
          'X-MICROCMS-API-KEY': $config.MICROCMS_API_KEY,
        },
      })
      .then((response) => {
        const timeUpdated = $dayjs(response.data.updatedAt).format('YYYY/MM/DD')
        return {
          article: response.data,
          timeUpdated: timeUpdated,
        }
      })
      .catch(function (e) {
        error({
          statusCode: e.response?.status,
          message: e.message,
        })
      })
  },
}
</script>
