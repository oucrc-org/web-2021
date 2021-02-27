<template>
  <div class="bg-gray-300">
    <div class="container mx-auto flex">
      <section class="bg-white m-5 p-8 max-w-screen-md" :class="$style.article">
        <div class="">
          <div v-if="typeof article.image !== 'undefined' && article.image !== 'null'">
            <img :src="article.image.url" :class="$style.article"/>
          </div>
          <div class="text-5xl m-8">
            {{article.title}}
          </div>
          <div class="m-8">
            <p>執筆者：{{article.name}}</p>
            <p>最終更新：{{article.updatedAt}}</p>
          </div>
          <span v-html="article.body"></span>
        </div>
      </section>

      <section class="bg-blue-500 sub-bar">
      </section>
    </div>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/androidstudio.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>

  </div>
</template>

<script>

  import axios from "axios";

  let url = ''

  export default{
    data(){
      return{
        article: 'There are no data'
      }
    },

    asyncData({params, error}){
      url = `https://oucrc.microcms.io/api/v1/article/${params.id}`
      return axios.get(url, {
        headers: {
          'X-API-KEY': '6d1b79a2-58de-49aa-bb5c-d2828e0d7d47'
        }
      })
    .then(response => {
        return{ article: response.data}
      }).catch(function (e) {
        console.log(e.statusCode)
        error({
          statusCode: e.statusCode,
          message: e.message
        })
      })
    }
  };
</script>

<style scoped>

.sub-bar{
  width: 400px;
  margin-left: 20px;
}

</style>

<style module>

  .article img{
    display: block;
    margin: auto;
  }

  .article h1{
    font-size: 2.1em;
    @apply border-gray-500 border-b-2 pt-5
  }

  .article h2{
    font-size: 1.8em;
    @apply pt-3
  }

  .article h3{
    font-size: 1.5em;
    @apply pt-1
  }

  .article h4{
    font-size: 1.2em;
  }

  .article h5{
    font-size: 0.9em;
  }

  .article h6{
    font-size: 0.6em;
  }

  .article code{
    overflow: scroll;
  }

  .article blockquote{
    @apply p-2 bg-gray-100 mb-4 border-l-4 border-gray-400;
  }

  .article blockquote > p {
    @apply mb-0;
  }

  .article ol{
    @apply list-decimal p-2
  }

  .article ul{
    @apply list-disc p-2
  }

  .article a{
    @apply text-blue-600;
  }

  .article iframe{
    display: block;
    margin: auto;
  }

</style>
