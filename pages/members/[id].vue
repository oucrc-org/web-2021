<template>
  <div>
    <!---------------------------------------------------  部員情報  --------------------------------------------------->
    <section class="container mx-auto px-3 pt-16 lg:pt-0">
      <!-- ▼ 記事一覧じゃない方(flexに変えました) -->
      <div class="flex flex-col md:flex-row mt-16 md:mt-20 justify-between px-6">
        <div class="lg:pl-8 pr-6">
          <div class="flex justify-between">
            <!-- ▼ メンバーアイコン -->
            <div class="w-24 xl:w-36 mb-4 md:mr-8">
              <div v-if="data?.member?.avatar" class="">
                <picture>
                  <source type="image/webp" :srcset="data?.member?.avatar.url + '?fm=webp'" />
                  <img
                    :src="data?.member?.avatar.url"
                    class="shadow-xl rounded-full object-cover"
                    alt="取得に失敗しました"
                  />
                </picture>
              </div>
              <div v-else class="lg:pl-8">
                <picture>
                  <source type="image/webp" srcset="/images/member/member.webp" />
                  <img
                    class="shadow-xl rounded-full object-cover h-24 xl:h-32 w-24 xl:w-32"
                    src="/images/member/member.jpg"
                    alt="メンバーアイコン"
                  />
                </picture>
              </div>
            </div>
            <!-- ▲ メンバーアイコン -->

            <!-- ▼ SNSリンク -->
            <div class="mt-2 text-center">
              <p
                v-if="data?.member?.enteryear !== void 0"
                class="bg-highlight inline-block md:w-40 px-6 py-1 rounded-lg text-secondary text-sm tracking-widest"
              >
                {{ data?.member?.enteryear }}年度 入部
              </p>
              <div class="flex items-center justify-around">
                <a
                  v-if="data?.member?.twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="`https://twitter.com/${data?.member?.twitter.replace(/@/g, '')}`"
                >
                  <img
                    src="/images/member/sns-twitter.png"
                    alt="Twitter"
                    class="inline mr-1 mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out"
                  />
                </a>
                <a
                  v-if="data?.member?.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="`https://github.com/${data?.member?.github.replace(/@/g, '')}`"
                >
                  <img
                    src="/images/member/sns-github.png"
                    alt="GitHub"
                    class="inline mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out"
                  />
                </a>
                <a
                  v-if="data?.member?.youtube"
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="`https://www.youtube.com/channel/${data?.member?.youtube}`"
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

          <!-- ▼ メンバー名 -->
          <div class="">
            <p class="font-bold text-3xl text-secondary tracking-widest">
              {{ data?.member?.name }}
            </p>
            <p v-if="data?.member?.status !== void 0" class="text-lg text-subtext tracking-widest">
              {{ data?.member?.status }}
            </p>
          </div>
          <!-- ▲ メンバー名 -->
        </div>

        <div class="md:pl-8 flex-grow md:border-l-4 border-highlight mt-8 md:mt-0">
          <!-- ▼ 自己紹介 -->
          <div
            class="bg-primary font-bold inline-block py-2 px-8 text-center text-sm text-white tracking-widest"
          >
            自己紹介
          </div>
          <p class="leading-8 mt-4 text-secondary tracking-widest" :class="$style.member">
            <span v-html="data?.member?.intro ?? 'なし'"></span>
          </p>
          <!-- ▲ 自己紹介 -->
        </div>
      </div>

      <!-- ▼ 自己紹介画像 -->
      <div v-if="data?.member && data?.member.introImage" class="my-32">
        <Heading label="自己紹介画像" class="mb-10" />
        <picture>
          <source type="image/webp" :srcset="data?.member.introImage.url + '?fm=webp'" />
          <img class="w-full" :src="data?.member.introImage.url" alt="取得に失敗しました" />
        </picture>
      </div>
      <!-- ▲ 自己紹介画像 -->

      <!-- ▼ この人が書いた記事 -->
      <div class="pt-16 mb-24 mt-10 lg:mx-8 xl:mx-12 text-center">
        <div class="container mx-auto">
          <Heading label="この人が書いた記事" class="mb-4" />
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ArticleCard
              v-for="article in data?.articles.contents"
              :key="`articlecard-${article.id}`"
              :article="article"
              class="py-6"
            />
          </div>
        </div>
      </div>
      <!-- ▲ この人が書いた記事 -->
    </section>

    <!---------------------------------------------------  部員情報  --------------------------------------------------->
  </div>
  <Loading v-if="pending" />
</template>

<script setup lang="ts">
const { params } = useRoute()
const { pending, data } = useFetch(`/api/member/${params.id}`)

useOG({
  title: () => data?.value?.member?.name,
  description: () => data?.value?.member?.status,
  ogImage: () => data?.value?.member?.avatar?.url,
})
</script>

<style module>
.member a {
  @apply text-blue-600;
}
</style>
