<template>
  <div class="grid grid-cols-6">
    <div class="grid grid-cols-1"></div>
    <section class="col-span-3 bg-red-500 m-5 p-8" :class="$style.article">
      <div v-if="typeof article.image !== 'undefined' && article.image !== 'null'">
        <img :src="article.image.url" :class="$style.article"/>
      </div>
      <div class="text-4xl m-8">
        {{article.title}}
      </div>
      <div class="m-8">
        <p>執筆者：{{article.name}}</p>
        <p>最終更新：{{article.updatedAt}}</p>
      </div>
      <span v-html="article.body"></span>
    </section>



    <section class="col-span-1 bg-blue-500" :class="$style.article">
    </section>
    <div class="col-span-1"></div>

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
        error({ statusCode: 404, message: e.message})
      })
    }
  };
</script>

<style module>
  .article img{
    display: block;
    margin: auto;
  }

  .article h1{
    font-size: 2.5em;
  }

  .article h2{
    font-size: 1.5em;
  }

  .article h3{
    font-size: 1.2em;
  }

  .article h4{
    font-size: 0.9em;
  }

  .article h5{
    font-size: 0.6em;
  }

  .article h6{
    font-size: 0.3em;
  }

  .article code{

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
