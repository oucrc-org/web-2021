<template>
  <div>
    {{article.body}}
    <code><pre>{{ article }}</pre></code>
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
        error({ statusCode: e.statusCode, message: e.message})
      })
    }
  }
</script>
