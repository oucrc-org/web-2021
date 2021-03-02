<template></template>

<script>
import Meta from '~/assets/mixins/meta'

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
        title: this.title,
        type: this.type,
        description: this.description,
        url: this.url,
        image: this.image
      }
    }
  }
}
</script>
