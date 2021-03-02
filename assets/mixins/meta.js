export default {
  head () {
    return {
      title: this.meta.title !== null ? this.meta.title : null,
      meta: [
        { hid: 'description', name: 'description', content: this.meta.description !== null ? this.meta.description : null },
        { hid: 'og:type', property: 'og:type', content: this.meta.type },
        { hid: 'og:title', property: 'og:title', content: this.meta.title },
        { hid: 'og:description', property: 'og:description', content: this.meta.description },
        { hid: 'og:url', property: 'og:url', content: this.meta.url },
        { hid: 'og:image', property: 'og:image', content: this.meta.image },
      ],
    }
  }
}
