<template>
  <div id="app" class="md:mx-auto md:w-3/4">
    <h1 class="font-bold mb-4 text-3xl sm:text-4xl text-center tracking-widest">最新の投稿</h1>
    <div id="contents" class="grid grid-cols-1 md:grid-cols-3 m-5">
      <div v-for="article in articles.contents" :key="article.publishedAt" class="mx-2 my-5 text-center">
        <h2 class="text-2xl">{{article.title}}</h2>
        <ArticleCard
          :href="'/article/' + article.id"
          :tag="article.category !== null ? article.category.category : null"
          :imgPath="article.image !== void(0) ? article.image.url : null"
          :description="article.body.replace(/<br>/g, '\n').replace(/<[^<>]+>/g, '').slice(0,60)" />
      </div>
    </div>
    <div>
      <div></div>
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
  asyncData({ query, error }) {
    const currentPageNum = +query.p || 1;
    const requestFieldFilter = 'id,title,publishedAt,category,image,body';
    return axios
      .get(`https://oucrc.microcms.io/api/v1/article?limit=9&offset=${ (currentPageNum - 1) * 9 || 1 }&fields=${ requestFieldFilter }`, {
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

</style>
