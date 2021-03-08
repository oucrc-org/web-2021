<template>
  <div class="container mb-32 mx-auto px-10">
    <OGPSetter
      title="記事一覧"
      description="OUCRC（岡山大学電子計算機研究会）の皆さんの書いた記事の一覧です！"
      :url="this.$route.path"/>

    <!-- 絞り込みツール -->
    <Title label="絞り込み" class="mt-16"/>
    <form @submit.prevent @change="updateSearchLink" name="search" class="md:mx-32 my-8">
      <div class="relative">
        <input type="search" name="keyword"
               class="appearance-none block bg-highlight w-full px-8 py-3 placeholder-heading rounded-full text-secondary text-sm"
               placeholder="キーワードを入力">
        <NuxtLink :to="searchQueryString">
          <img src="~/assets/images/search.svg" alt="検索" class="absolute h-6 top-0 right-0 mr-5 mt-3 cursor-pointer">
        </NuxtLink>
      </div>
      <div class="mt-10">
        <LabeledCheckbox
          v-for="category in categories.contents"
          :key="`checkbox-${category.id}`"
          :id="category.id"
          :label="category.category"
          name="category"
          @search="updateSearchLink();$router.push(String(searchQueryString))"
          :value="category.id"/>
      </div>
      <div class="mt-4">
        <LabeledCheckbox
          v-for="series in serieses.contents"
          :key="`checkbox-${series.id}`"
          :id="series.id"
          :label="series.series"
          name="series"
          @search="updateSearchLink();$router.push(String(searchQueryString))"
          :value="series.id"/>
      </div>
    </form>

    <!-- 記事一覧 -->
    <div v-if="articles.contents !== void(0) && articles.contents.length"
         class="pt-16 mb-24 mt-10 lg:mx-8 xl:mx-12 text-center">
      <div class="container mx-auto">
        <Title label="最新の投稿" class="mb-4"/>
        <div class="sm:grid grid-cols-3 gap-8">
          <ArticleCard
            v-for="article in articles.contents"
            :key="article.id"
            class="py-6"
            :href="`/articles/${article.id}`"
            :series="article.series != null ? article.series : {}"
            :category="article.category !== void(0) ? article.category.category : null"
            :img-path="article.image !== void(0) ? article.image.url : null"
            :title="article.title !== void(0) ? article.title : null"
            :description="article.body.replace(/<br>/g, '\n').replace(/<[^<>]+>/g, '')"/>
        </div>
      </div>
    </div>

    <!-- ページジャンパー -->
    <div class="page-jumper">
      <NuxtLink v-if="currentPageNum > 1" :to="{ query: appendQuery({p: currentPageNum - 1}) }">
        <div class="text-subtext text-xl">&lt;</div>
      </NuxtLink>
      <NuxtLink v-for="pageNum in arrayJumpTo"
                :key="'jumper' + pageNum"
                :to="{ query: appendQuery({p: pageNum}) }">
        <div class="text-xl" :class="[ pageNum === currentPageNum ? 'text-primary' : 'text-subtext' ]">
          {{ pageNum }}
        </div>
      </NuxtLink>
      <NuxtLink v-if="currentPageNum <= articles.totalCount / 9" :to="{ query: appendQuery({p: currentPageNum + 1}) }">
        <div class="text-subtext text-xl">&gt;</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  watchQuery: ['p', 'keyword', 'category', 'series'],
  data() {
    return {
      currentPageNum: {
        type: Number,
        default: 1
      },
      arrayJumpTo: [],
      articles: {contents: []},
      categories: {contents: []},
      serieses: {contents: []},
      searchQueryString: {
        type: String,
        default: ''
      }
    };
  },
  methods: {
    appendQuery(newQuery) {
      return {
        ...this.$route.query,
        ...newQuery
      }
    },
    updateSearchLink() {
      const elementsSearchForm = document.forms.search.elements;
      const searchQuery = {};
      if (typeof elementsSearchForm.keyword.value !== 'undefined' && elementsSearchForm.keyword.value !== '') {
        searchQuery.keyword = elementsSearchForm.keyword.value;
      }
      const categories = [];
      for (const category of elementsSearchForm.category) {
        if (category.checked) {
          categories.push(category.value);
        }
      }
      if (categories.length) {
        searchQuery.category = categories;
      }
      const serieses = [];
      for (const series of elementsSearchForm.series) {
        if (series.checked) {
          serieses.push(series.value);
        }
      }
      if (serieses.length) {
        searchQuery.series = serieses;
      }
      this.searchQueryString = '?' + Object.entries(searchQuery).map(([k, v]) => {
        if (typeof v === 'object') {
          return v.map(u => `${k}=${u}`).join('&')
        } else {
          return `${k}=${v}`
        }
      }).join('&')
    }
  },
  beforeRouteUpdate(to, from, next) {
    const currentPageNum = +to.query.p || 1;
    const currentTime = new Date().toISOString();
    const url = 'https://oucrc.microcms.io/api/v1';
    const headers = {
      "X-API-KEY": "6d1b79a2-58de-49aa-bb5c-d2828e0d7d47",
    };
    const promiseArticles = axios.get(url + '/article', {
      headers,
      params: {
        limit: 9,
        offset: (currentPageNum - 1) * 9,
        fields: 'id,title,category,image,body',
        orders: '-date,-createdAt',
        filters: [
          `date[less_than]${currentTime}`,
          ...(() => {
            const searchQuery = [];
            if ('keyword' in to.query && to.query.keyword !== null) {
              searchQuery.push(
                to.query.keyword.split(/\s+/)
                  .map(w => `body[contains]${w}[or]title[contains]${w}`)
                  .join('[and]')
              )
            }
            if ('category' in to.query) {
              if (typeof to.query.category === 'string') {
                to.query.category = [to.query.category]
              }
              searchQuery.push(
                to.query.category
                  .map(id => `category[equals]${id}`)
                  .join('[or]')
              )
            }
            if ('series' in to.query) {
              if (typeof to.query.series === 'string') {
                to.query.series = [to.query.series]
              }
              searchQuery.push(
                to.query.series
                  .map(id => `series[equals]${id}`)
                  .join('[or]')
              )
            }
            return searchQuery;
          })()
        ].join('[and]')
      }
    });
    promiseArticles.then(response => {
      this.articles = response.data;
      this.currentPageNum = currentPageNum;
      this.arrayJumpTo = getArrayJumpTo(response.data.totalCount, 9);
    }).catch(e => {
      error({
        statusCode: e.response.status,
        message: e.message
      })
    })
    next();
  },
  asyncData({query}) {
    const currentPageNum = +query.p || 1;
    const currentTime = new Date().toISOString();
    const url = 'https://oucrc.microcms.io/api/v1';
    const headers = {
      "X-API-KEY": "6d1b79a2-58de-49aa-bb5c-d2828e0d7d47",
    };
    const promiseArticles = axios.get(url + '/article', {
      headers,
      params: {
        limit: 9,
        offset: (currentPageNum - 1) * 9,
        fields: 'id,title,category,image,body',
        orders: '-date,-createdAt',
        filters: [
          `date[less_than]${currentTime}`,
          ...(() => {
            const searchQuery = [];
            if ('keyword' in query && query.keyword !== null) {
              searchQuery.push(
                query.keyword.split(/\s+/)
                  .map(w => `body[contains]${w}[or]title[contains]${w}`)
                  .join('[and]')
              )
            }
            if ('category' in query) {
              if (typeof query.category === 'string') {
                query.category = [query.category]
              }
              searchQuery.push(
                query.category
                  .map(id => `category[equals]${id}`)
                  .join('[or]')
              )
            }
            if ('series' in query) {
              if (typeof query.series === 'string') {
                query.series = [query.series]
              }
              searchQuery.push(
                query.series
                  .map(id => `series[equals]${id}`)
                  .join('[or]')
              )
            }
            return searchQuery;
          })()
        ].join('[and]')
      }
    });
    const promiseCategories = axios.get(url + '/category', {
      headers,
      params: {
        limit: 1000,
        fields: 'id,category'
      }
    });
    const promiseSerieses = axios.get(url + '/series', {
      headers,
      params: {
        limit: 1000,
        fields: 'id,series',
        orders: 'createdAt'
      }
    });
    return Promise.all([
      promiseArticles,
      promiseCategories,
      promiseSerieses
    ]).then(([articles, categories, serieses]) => {
      return Promise.resolve({
        articles: articles.data,
        currentPageNum: currentPageNum,
        arrayJumpTo: getArrayJumpTo(articles.data.totalCount, 9),
        categories: categories.data,
        serieses: serieses.data,
      })
    })
  },
};

function getArrayJumpTo(totalCount, countPerPage) {
  return [...Array(Math.ceil(totalCount / countPerPage)).keys()].map(i => ++i);
}
</script>

<style scoped>
::-webkit-search-cancel-button {
  appearance: none;
}

.page-jumper {
  @apply flex flex-row mx-auto my-2 justify-center;
}

.page-jumper div {
  @apply px-3;
}
</style>
