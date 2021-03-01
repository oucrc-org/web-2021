<template>
  <div class="container mb-32 mt-16 mx-auto px-10">
    <!-- 記事一覧 -->
    <Title label="最新の投稿" class="mt-20" />
    <div id="contents" class="grid grid-cols-1 md:grid-cols-3 m-5">
      <div v-for="article in articles.contents" :key="article.id" class="mx-2 my-5 text-center">
        <h2 class="text-2xl">{{article.title}}</h2>
        <ArticleCard
          :href="'/article/' + article.id"
          :tag="article.category !== null ? article.category.category : null"
          :imgPath="article.image !== void(0) ? article.image.url : null"
          :description="article.body.replace(/<br>/g, '\n').replace(/<[^<>]+>/g, '').slice(0,60)" />
      </div>
    </div>

    <!-- ページジャンパー -->
    <div class="page-jumper divide-x-2">
      <NuxtLink v-if="currentPageNum > 1" :to="{ query: appendQuery({p: currentPageNum - 1}) }"><div>&lt;</div></NuxtLink>
      <NuxtLink v-for="pageNum in arrayJumpTo"
        :key="'jumper' + pageNum"
        :to="{ query: appendQuery({p: pageNum}) }">
        <div>{{pageNum}}</div>
      </NuxtLink>
      <NuxtLink v-if="currentPageNum <= articles.totalCount / 9" :to="{ query: appendQuery({p: currentPageNum + 1}) }"><div>&gt;</div></NuxtLink>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  watchQuery: ['p'],
  data() {
    return {
      articles: {
        contents: [],
      },
      currentPageNum: {
        type: Number,
        default: 1
      },
      arrayJumpTo: [],
    };
  },
  methods: {
    appendQuery(newQuery) {
      return {
        ...this.$route.query,
        ...newQuery
      }
    }
  },
  asyncData({ query, error }) {
    const currentPageNum = +query.p || 1;
    const currentTime = new Date().toISOString();
    return axios
      .get('https://oucrc.microcms.io/api/v1/article?' + Object.entries({
        limit: 9,
        offset: (currentPageNum - 1) * 9,
        fields: 'id,title,series,image,body',
        orders: '-date,-createdAt',
        filters: 'date[less_than]' + currentTime
      }).map(([key, value]) => key + '=' + value).join('&'), {
        headers: {
          "X-API-KEY": "6d1b79a2-58de-49aa-bb5c-d2828e0d7d47",
        },
      }).then(response => {
        return {
          articles: response.data,
          currentPageNum: currentPageNum,
          arrayJumpTo: getArrayJumpTo(currentPageNum, response.data.totalCount, 9)
        }
      }).catch(e => {
        error({
          statusCode: e.response.status,
          message: e.message
        })
      })
  },
};

function getArrayJumpTo(currentPageNum, totalCount, countPerPage) {
  const arrayJumpTo = [];
  for (let i = currentPageNum, j = 1; i >= 1; i -= j, j *= 2) {
    arrayJumpTo.unshift(i);
  }
  if (arrayJumpTo[0] !== 1) {
    arrayJumpTo.unshift(1);
  }
  for (let i = currentPageNum, j = 1; (i += j) <= totalCount / countPerPage; j *= 2) {
    arrayJumpTo.push(i);
  }
  if (arrayJumpTo[arrayJumpTo.length - 1] < Math.ceil(totalCount / countPerPage)) {
    arrayJumpTo.push(Math.ceil(totalCount / countPerPage));
  }
  return arrayJumpTo;
}
</script>

<style scoped>
.page-jumper {
  @apply flex flex-row mx-auto my-2 justify-center
}

.page-jumper div {
  @apply p-1
}
</style>
