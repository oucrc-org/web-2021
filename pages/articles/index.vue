<template>
  <div class="container mb-32 mx-auto px-10">
    <OGPSetter
      title="記事一覧"
      description="OUCRC（岡山大学電子計算機研究会）の皆さんの書いた記事の一覧です！"
      :url="this.$route.path"
    />

    <!-- 絞り込みツール -->
    <Title label="絞り込み" class="mt-16" />
    <form @submit.prevent name="search" class="md:mx-32 my-8">
      <div class="mt-10">
        <LabeledCheckbox
          v-for="category in categories"
          :key="`checkbox-${category.id}`"
          :id="category.id"
          :label="category.category"
          name="category"
          @search="$router.push({ name: 'category', params: { categoryId: category.id } })"
          :value="category.id"
        />
      </div>
      <div class="mt-4">
        <LabeledCheckbox
          v-for="series in serieses"
          :key="`checkbox-${series.id}`"
          :id="series.id"
          :label="series.series"
          name="series"
          @search="$router.push({ name: 'series', params: { seriesId: series.id } })"
          :value="series.id"
        />
      </div>
    </form>

    <!-- 記事一覧 -->
    <div
      v-if="articles !== void 0 && articles.length"
      class="pt-16 mb-24 mt-10 lg:mx-8 xl:mx-12 text-center"
    >
      <div class="container mx-auto">
        <Title label="最新の投稿" class="mb-4" />
        <!-- ページジャンパー（上部） -->
        <Pagenation
          :currentPageNum="currentPageNum"
          :maxPageNum="maxPageNum"
          :createNuxtLinkTo="(n) => ({ name: listType, params: { p: n } })"
          class="mb-8"
        />
        <div class="sm:grid grid-cols-3 gap-8">
          <ArticleCard
            v-for="article in articles"
            :key="article.id"
            class="py-6"
            :href="`/articles/${article.id}`"
            :category="
              article.category !== null
                ? categories.find(category => category.id === article.category.id) ?? null
                : null"
            :img-path="article.image !== void 0 ? article.image.url : null"
            :img-max-width="559"
            :title="article.title !== void 0 ? article.title : null"
            :description="article.summary"
          />
        </div>
      </div>
    </div>

    <!-- ページジャンパー -->
    <Pagenation
      :currentPageNum="currentPageNum"
      :maxPageNum="maxPageNum"
      :createNuxtLinkTo="(n) => ({ name: listType, params: { p: n } })"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPageNum: 1,
      maxPageNum: 1,
      articles: [],
      categories: [],
      serieses: [],
      listType: this.$route.name === 'articles' ? 'article' : this.$route.name,
    }
  },
  asyncData({ payload, params, $config }) {
    const currentPageNum = payload.currentPageNum;
    const maxPageNum = payload.maxPageNum;
    const articles = payload.articles;
    const categories = payload.categories;
    const serieses = payload.series;
    articles.forEach(article => {
      const summaryLengthLimit = 60;
      if (article.summary !== undefined) {
        return;
      }
      if (article.markdown_enabled && article.body_markdown) {
        article.summary = article.body_markdown.slice(0, summaryLengthLimit);
        return;
      }
      article.summary = (
        article.body_html ?? article.body
      )
        .replace(/<[^<>]+>/g, '')
        .slice(0, summaryLengthLimit);
    });
    return {
      currentPageNum,
      maxPageNum,
      articles,
      categories,
      serieses,
    }
  },
}
</script>

<style scoped>
::-webkit-search-cancel-button {
  appearance: none;
}
</style>
