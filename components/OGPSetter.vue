<template></template>

<script>
/*
* 設定できるもの
* title
* type
* description
* url
* image
*
* */


import Meta from '~/assets/mixins/meta'

//HTMLタグを取り除く式
const replace = (data) => data !== null ? data.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'') : null

export default{

  mixins: [Meta],
  name: "OGPSetter",
  props: {
    title: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    }
  },

  data(){
    return {
      meta: {
        title: replace(this.title),
        type: this.type,
        description: replace(this.description),
        url: this.url,
        image: this.image
      }
    }
  },
}
</script>
