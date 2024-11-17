<template>
  <div>
    <OGPSetter
      :title="member.name"
      :description="member.status"
      :url="this.$route.path"
      :image="member.avatar !== void 0 ? member.avatar.url : null"
    />

    <!---------------------------------------------------  部員情報  --------------------------------------------------->

    <section class="container mx-auto px-3 pt-16 lg:pt-0">
      <!-- ▼ 記事一覧じゃない方(flexに変えました) -->
      <div class="flex flex-col md:flex-row mt-16 md:mt-20 justify-between px-6">
        <div class="lg:pl-8 pr-6">
          <div class="flex justify-between">
            <!-- ▼ メンバーアイコン -->
            <div class="w-24 xl:w-36 mb-4 md:mr-8">
              <div v-if="member.avatar !== void 0" class="">
                <picture>
                  <source type="image/webp" :srcset="member.avatar.url + '?fm=webp'" />
                  <img
                    :src="member.avatar.url"
                    class="shadow-xl rounded-full object-cover"
                    alt="取得に失敗しました"
                  />
                </picture>
              </div>
              <div v-else class="lg:pl-8">
                <picture>
                  <source
                    type="image/webp"
                    :srcset="require('@/assets/images/member/member.webp')"
                  />
                  <img
                    class="shadow-xl rounded-full object-cover h-24 xl:h-32 w-24 xl:w-32"
                    v-lazy="require('@/assets/images/member/member.jpg')"
                    alt="メンバーアイコン"
                  />
                </picture>
              </div>
            </div>
            <!-- ▲ メンバーアイコン -->

            <!-- ▼ SNSリンク -->
            <div class="mt-2 text-center">
              <p
                v-if="member.enteryear !== void 0"
                class="bg-highlight inline-block md:w-40 px-6 py-1 rounded-lg text-secondary text-sm tracking-widest"
              >
                {{ member.enteryear }}年度 入部
              </p>
              <div class="flex items-center justify-around">
                <a
                  v-if="member.twitter !== void 0"
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="`https://twitter.com/${member.twitter.replace(/@/g, '')}`"
                >
                  <img
                    v-lazy="require('@/assets/images/member/sns-twitter.png')"
                    alt="Twitter"
                    class="inline mr-1 mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out"
                  />
                </a>
                <a
                  v-if="member.github !== void 0"
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="`https://github.com/${member.github.replace(/@/g, '')}`"
                >
                  <img
                    v-lazy="require('@/assets/images/member/sns-github.png')"
                    alt="GitHub"
                    class="inline mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out"
                  />
                </a>
                <a
                  v-if="member.youtube !== void 0"
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="`https://www.youtube.com/channel/${member.youtube}`"
                >
                  <img
                    v-lazy="require('@/assets/images/member/sns-youtube.png')"
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
            <p
              v-if="member.name !== void 0"
              class="font-bold text-3xl text-secondary tracking-widest"
            >
              {{ member.name }}
            </p>
            <p v-if="member.status !== void 0" class="text-lg text-subtext tracking-widest">
              {{ member.status }}
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
            <span v-html="member.intro !== void 0 ? member.intro : 'なし'"></span>
          </p>
          <!-- ▲ 自己紹介 -->
        </div>
      </div>

      <!-- ▼ 自己紹介画像 -->
      <div v-if="member.introImage !== void 0" class="my-32">
        <Title label="自己紹介画像" class="mb-10" />
        <picture>
          <source type="image/webp" :srcset="member.introImage.url + '?fm=webp'" />
          <img class="w-full" v-lazy="member.introImage.url" alt="取得に失敗しました" />
        </picture>
      </div>
      <!-- ▲ 自己紹介画像 -->

      <!-- ▼ この人が書いた記事 -->
      <div
        v-if="articles !== void 0 && articles.length"
        class="pt-16 mb-24 mt-10 lg:mx-8 xl:mx-12 text-center"
      >
        <div class="container mx-auto">
          <Title label="この人が書いた記事" class="mb-4" />
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ArticleCard
              v-for="article in articles"
              :key="`articlecard-${article.id}`"
              class="py-6"
              :href="`/articles/${article.id}`"
              :category="
                article.category !== null
                  ? categories.find(category => category.id === article.category.id) ?? null
                  : null"
              :img-path="article.image !== void 0 ? article.image.url : null"
              :title="article.title !== void 0 ? article.title : null"
              :description="article.body.replace(/<br>/g, '\n').replace(/<[^<>]+>/g, '')"
            />
          </div>
        </div>
      </div>
      <!-- ▲ この人が書いた記事 -->
    </section>

    <!---------------------------------------------------  部員情報  --------------------------------------------------->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      member: {},
      articles: [],
      categories: [],
    }
  },
  async asyncData({ payload, params, error, $config }) {
    if (payload) {
      return {
        member: payload.member,
        articles: payload.articles,
        categories: payload.categories,
      }
    }
    // fallback
    try {
      const member = await axios
        .get(
          `${$config.API_URL}/member/${params.id}`,
          {
            headers: {
              'X-MICROCMS-API-KEY': $config.MICROCMS_API_KEY,
            },
          }
        )
        .then(res => res.data);
      const articles = await axios
        .get(
          `${$config.API_URL}/article`,
          {
            headers: {
              'X-MICROCMS-API-KEY': $config.MICROCMS_API_KEY,
            },
            params: {
              limit: 10000,
              filters: `name[equals]${member.id}`,
            },
          }
        )
        .then(res => res.contents);
      return {
        member,
        articles,
      }
    } catch (e) {
      error({
        statusCode: e.response.status,
        message: e.message,
      })
    }
  },
}
</script>

<style module>
.member a {
  @apply text-blue-600;
}
</style>
