<template>
  <div id="app">
    <div id="contents">
      <code><pre>{{ json }}</pre></code>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      json: 'No data'
    }
  },
  mounted() {
    // APIはこれで叩けます！！
    axios
      .get('https://oucrc.microcms.io/api/v1/article', {
        headers: {
        'X-API-KEY': '6d1b79a2-58de-49aa-bb5c-d2828e0d7d47'
        }
      })
      .then(response => {
        this.json = response.data
      })
  }
};
</script>

<style scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
