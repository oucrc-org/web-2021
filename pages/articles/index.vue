<template>
  <div class="container mb-32 mx-auto px-10">
    <!-- 絞り込みツール -->
    <Heading label="絞り込み" class="mt-16" />
    <NuxtLink v-if="$route.params.categoryId || $route.params.seriesId" to="/articles">
      <a class="bg-gray-200 p-4 rounded-md font-bold">一覧に戻る</a>
    </NuxtLink>
    <form @submit.prevent name="search" class="md:mx-32 my-8">
      <div v-if="categories" class="mt-10">
        <LabeledCheckbox
          v-for="category in categories.contents"
          :key="`checkbox-${category.id}`"
          :id="category.id"
          :label="category.category"
          name="category"
          @search="$router.push({ name: 'category', params: { categoryId: category.id } })"
          :value="category.id"
        />
      </div>
      <div v-if="serieses" class="mt-4">
        <LabeledCheckbox
          v-for="series in serieses.contents"
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
      v-if="articles && articles.contents.length"
      class="pt-16 mb-24 mt-10 lg:mx-8 xl:mx-12 text-center"
    >
      <div class="container mx-auto">
        <Heading label="最新の投稿" class="mb-4" />
        <div class="sm:grid grid-cols-3 gap-8">
          <ArticleCard
            v-for="article in articles.contents"
            :key="article.id"
            class="py-6"
            :article="article"
            :href="`/articles/${article.id}`"
          />
        </div>
      </div>
    </div>

    <!-- ページジャンパー -->
    <div class="page-jumper">
      <NuxtLink
        v-if="currentPageNum > 1"
        :to="{ name: listType, params: { p: currentPageNum - 1 } }"
      >
        <div class="text-subtext text-xl">&lt;</div>
      </NuxtLink>
      <NuxtLink
        v-if="articles?.totalCount"
        v-for="pageNum in getArrayJumpTo(articles?.totalCount, 9)"
        :key="'jumper' + pageNum"
        :to="{ name: listType, params: { p: pageNum } }"
      >
        <div
          class="text-xl"
          :class="[pageNum === currentPageNum ? 'text-primary' : 'text-subtext']"
        >
          {{ pageNum }}
        </div>
      </NuxtLink>
      <NuxtLink
        v-if="articles && currentPageNum < Math.ceil(articles.totalCount / 9)"
        :to="{ name: listType, params: { p: currentPageNum + 1 } }"
      >
        <div class="text-subtext text-xl">&gt;</div>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MicroCMSListResponse } from 'microcms-js-sdk'
import type { Article, Category, Series } from '~/types/micro-cms'

const { params, name } = useRoute()

/**
 * カテゴリーやシリーズのページも、pages:expandフックによりこのVueを使う
 */
let listType = 'article'
if (name && name.toString() !== 'articles') {
  listType = name.toString()
}

const searchQuery: string[] = []
if ('categoryId' in params) {
  searchQuery.push(`category[equals]${params.categoryId}`)
}
if ('seriesId' in params) {
  searchQuery.push(`series[equals]${params.seriesId}`)
}
const currentPageNum = Number(params.p) ?? 1
const currentTime = new Date().toISOString()
const { data: articles } = useFetch<MicroCMSListResponse<Article>>('/api/article', {
  params: {
    limit: 9,
    offset: currentPageNum - 1 > 0 ? (currentPageNum - 1) * 9 : 0,
    fields: 'id,title,category,image,body',
    orders: '-date,-createdAt',
    filters: [`date[less_than]${currentTime}`, ...searchQuery].join('[and]'),
  },
})
const { data: categories } = useFetch<MicroCMSListResponse<Category>>('/api/category', {
  params: {
    limit: 1000,
    fields: 'id,category',
  },
})
const { data: serieses } = useFetch<MicroCMSListResponse<Series>>('/api/series', {
  params: {
    limit: 1000,
    fields: 'id,series',
    orders: 'createdAt',
  },
})
useSeoMeta({
  title: '記事一覧',
  description: 'OUCRC（岡山大学電子計算機研究会）の皆さんの書いた記事の一覧です！',
})
const getArrayJumpTo = (totalCount: number, countPerPage: number) => {
  return [...Array(Math.ceil(totalCount / countPerPage)).keys()].map((i) => i + 1)
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
