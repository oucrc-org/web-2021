<template>
  <div class="container mx-auto">
    <div class="lg:grid grid-cols-3 gap-8 xl:gap-12 lg:mt-16 pb-10">
      <!---------------------------------------------------  メイン  --------------------------------------------------->
      <section class="bg-white lg:col-span-2 row-span-2 mb-2 md:mb-32 pb-20 lg:shadow-xl">
        <ArticleContent v-if="data?.article" :article="data?.article" />
      </section>
      <!---------------------------------------------------  メイン  --------------------------------------------------->

      <!--------------------------------------------------  サイドバー  ------------------------------------------------->
      <section
        class="bg-white border-t lg:border-none border-divider pt-16 lg:pt-0 sm:px-16 md:px-24 lg:px-0 lg:shadow-xl"
      >
        <div class="grid grid-cols-9 gap-4 mt-12">
          <!-- ▼ メンバーアイコン -->
          <NuxtLink :to="`/members/${data?.article?.name.id}`" class="col-span-4">
            <div v-if="data?.article?.name.avatar !== void 0" class="inline-block pl-8 row-end-2">
              <picture>
                <source
                  type="image/webp"
                  :srcset="`${data?.article?.name.avatar.url}?fm=webp&w=128`"
                />
                <img
                  :src="`${data?.article?.name.avatar.url}?w=128`"
                  class="shadow-xl rounded-full w-32 lg:w-24 xl:w-32 h-32 lg:h-24 xl:h-32"
                  alt="取得に失敗しました"
                />
              </picture>
            </div>
            <div v-else>
              <picture>
                <source type="image/webp" srcset="/images/member/member.webp" />
                <img
                  class="object-cover shadow-xl rounded-full w-32 lg:w-24 xl:w-32 h-32 lg:h-24 xl:h-32 m-auto"
                  src="/images/member/member.jpg"
                  alt="メンバーアイコン"
                />
              </picture>
            </div>
          </NuxtLink>
          <!-- ▲ メンバーアイコン -->

          <!-- ▼ SNSリンク -->
          <div
            class="col-span-5 inline-block mt-2 pr-8 lg:pr-5 pl-4 lg:pl-0 text-right lg:text-center"
          >
            <p
              class="bg-highlight inline-block px-5 xl:px-6 py-1 rounded-lg text-secondary text-sm tracking-widest"
            >
              {{ data?.article?.name.enteryear }}年度 入部
            </p>
            <div class="lg:text-left xl:pl-3 pr-1">
              <a
                v-if="data?.article?.name.twitter"
                target="_blank"
                rel="noopener noreferrer"
                :href="`https://twitter.com/${data?.article?.name.twitter.replace(/@/g, '')}`"
              >
                <img
                  src="/images/member/sns-twitter.png"
                  alt="Twitter"
                  class="inline mr-1 mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out"
                />
              </a>
              <a
                v-if="data?.article?.name.github"
                target="_blank"
                rel="noopener noreferrer"
                :href="`https://github.com/${data?.article?.name.github.replace(/@/g, '')}`"
              >
                <img
                  src="/images/member/sns-github.png"
                  alt="GitHub"
                  class="inline mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out"
                />
              </a>
              <a
                v-if="data?.article?.name.youtube"
                target="_blank"
                rel="noopener noreferrer"
                :href="`https://www.youtube.com/channel/${data?.article?.name.youtube}`"
              >
                <img
                  src="/images/member/sns-youtube.png"
                  alt="YouTube"
                  class="inline ml-2 mt-4 w-6 xl:w-8 transform hover:scale-110 transition duration-200 ease-in-out"
                />
              </a>
            </div>
          </div>
          <!-- ▲ SNSリンク -->
        </div>

        <!-- ▼ メンバー紹介 -->
        <div class="mt-3 xl:mt-6 mx-10 pb-8" v-if="data?.article?.name !== void 0">
          <p class="font-bold text-3xl text-secondary tracking-widest">
            <NuxtLink :to="`/members/${data?.article?.name.id}`">
              {{ data?.article?.name.name }}
            </NuxtLink>
          </p>
          <p class="leading-7 mt-1 text-secondary tracking-widest">
            <NuxtLink :to="`/members/${data?.article?.name.id}`">
              {{ data?.article?.name.status }}
            </NuxtLink>
          </p>
        </div>
        <!-- ▲ メンバー情報 -->

        <!-- ▼ この人が書いた記事 -->
        <div class="pt-24 mx-8 sm:mx-10 text-center">
          <Heading label="この人が書いた記事" />
          <div
            v-for="otherArticle in data?.otherArticles.contents"
            :key="`otherArticle-${otherArticle.id}`"
          >
            <ArticleCard
              v-if="otherArticle"
              :article="otherArticle"
              :href="`/articles/${otherArticle.id}`"
              class="py-8"
            />
          </div>
        </div>
        <!-- ▲ この人が書いた記事 -->

        <!-- ▼ 最新のオススメ記事 -->
        <div class="pt-24 mx-8 sm:mx-10 text-center">
          <Heading label="最新のオススメ記事" />
          <div
            v-for="recommendArticle in data?.recommendArticles.contents"
            :key="`recommendArticle-${recommendArticle.id}`"
          >
            <ArticleCard
              v-if="recommendArticle"
              :article="recommendArticle"
              :href="`/articles/${recommendArticle.id}`"
              class="py-8"
            />
          </div>
        </div>
        <!-- ▲ 最新のオススメ記事 -->
      </section>
      <!--------------------------------------------------  サイドバー  ------------------------------------------------->
    </div>
  </div>
  <Loading v-if="pending" />
</template>

<script lang="ts">
declare global {
  interface Window {
    MathJax: any
  }
}
</script>

<script setup lang="ts">
const { params } = useRoute()
const { pending, data } = useFetch(`/api/article/${params.id}`)

useOG({
  title: () => data?.value?.article?.title,
  description: () =>
    data?.value?.article?.body
      .slice(0, 200)
      .replace(/<br>/g, '\n')
      .replace(/<[^<>]+>/g, '')
      .replace(/\n/g, ''),
  ogImage: () => data?.value?.article?.image?.url,
})
const renderMathJax = () => {
  if (window.MathJax) {
    window.MathJax.Hub.Config({
      TeX: { equationNumbers: { autoNumber: 'AMS' } },
      tex2jax: {
        inlineMath: [
          ['$', '$'],
          ['\\(', '\\)'],
        ],
        processEscapes: true,
      },
      'HTML-CSS': { matchFontHeight: false },
      displayAlign: 'center',
      displayIndent: '2em',
    })
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
  }
}
onMounted(() => renderMathJax())
</script>
