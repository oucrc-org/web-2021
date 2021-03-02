import config from '~/assets/mixins/const'

export default {


  head () {
    return {
      title: this.meta.title !== null ? this.meta.title : config.TITLE,
      meta: [
        { hid: 'description', name: 'description', content: this.meta.description !== null ? this.meta.description : config.DESCRIPTION },
        { hid: 'og:type', property: 'og:type', content: this.meta.type !== null ? this.meta.type : config.TYPE },
        { hid: 'og:title', property: 'og:title', content: this.meta.title !== null ? this.meta.title : config.TITLE },
        { hid: 'og:description', property: 'og:description', content: this.meta.description !== null ? this.meta.description : config.DESCRIPTION },
        { hid: 'og:url', property: 'og:url', content: this.meta.url !== null ? this.meta.url : config.URL },
        { hid: 'og:image', property: 'og:image', content: this.meta.image !== null ? this.meta.image : config.IMAGE },
      ],
    }
  }
}
