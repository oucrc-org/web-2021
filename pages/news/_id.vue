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

      <ArticleContent :article="article" :timeUpdated="timeUpdated"/>

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
  asyncData({params, error, $config}) {
    return axios.get(`${$config.API_URL}/news/${params.id}`, {
      headers: {
        'X-API-KEY': $config.X_API_KEY
      }
    }).then(response => {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
      const timeUpdated = new Date(response.data.updatedAt).toLocaleDateString('ja-JP', options)
      return {
        article: response.data,
        timeUpdated: timeUpdated
      }
    }).catch(function (e) {
      error({
        statusCode: e.response.status,
        message: e.message
      })
    })
  }
}
</script>
