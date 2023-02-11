<template>
  <div id="app">
    <div
      ref="parallax"
      class="parallax bg-no-repeat bg-center bg-cover h-full fixed left-0 top-16 w-full z-0"
    ></div>

    <!-- ▼ ヒーローエリア -->
    <HeroArea />
    <!-- ▲ ヒーローエリア -->

    <!-- ▼ 電子計算機研究会とは -->
    <section class="bg-white border-t-2 py-32 relative w-full">
      <div class="container mx-auto">
        <fade-in>
          <div class="divide-y divide-divider mb-20 px-4 sm:px-24 md:px-40 lg:px-64 xl:px-96">
            <h2 class="font-bold mb-4 text-3xl sm:text-4xl text-center tracking-widest">
              電子計算機研究会とは
            </h2>
            <p class="pt-5 text-center sm:text-lg text-secondary tracking-widest">
              何をしているところなの？
            </p>
          </div>
        </fade-in>

        <div class="grid sm:grid-cols-3 gap-16 px-5">
          <fade-in class="opacity-0">
            <ArticleCard
              href="/articles/category/noi18t4xa3"
              category="プログラミング"
              :imgPath="require('@/assets/images/landing/cover-programming.jpg')"
              :ignoreAbridgement="true"
              :webpPath="require('@/assets/images/landing/cover-programming.webp')"
              description="スマホアプリやゲームなどを、個人で開発したり、グループでプロジェクトを立ち上げたりしています！"
            ></ArticleCard>
          </fade-in>
          <fade-in class="opacity-0" :delay="150">
            <ArticleCard
              href="/articles/category/2_x0e6wfbu"
              category="電子工作"
              :img-path="require('@/assets/images/landing/cover-electronic.jpg')"
              :ignoreAbridgement="true"
              :webpPath="require('@/assets/images/landing/cover-electronic.webp')"
              description="部室には道具がたくさんあるので、電子工作に挑戦するのに金銭的負担やハードルがないのも魅力です。"
            ></ArticleCard>
          </fade-in>
          <fade-in class="opacity-0" :delay="300">
            <ArticleCard
              href="/articles/category/ls-ivl76nq2"
              category="ガジェット/ハードウェア"
              :img-path="require('@/assets/images/landing/cover-gadget.jpg')"
              :ignoreAbridgement="true"
              :webpPath="require('@/assets/images/landing/cover-gadget.webp')"
              description="過去にはXboxを分解したり、部の余ったPCに好きなOSを入れてサーバーを立てたりしました。"
            ></ArticleCard>
          </fade-in>
        </div>
        <fade-in>
          <p
            class="font-semibold leading-8 mt-20 text-center text-lg text-secondary tracking-widest"
          >
            他にも、<br class="sm:hidden" />3Dプリンタで色々なものを制作したり<br
              class="sm:hidden"
            />ゲーム大会を開いたりしています！
          </p>
        </fade-in>
      </div>
    </section>
    <!-- ▲ 電子計算機研究会とは -->

    <!-- ▼ 電算研の部室 -->
    <section class="relative w-full z-10" style="height: 83vh">
      <div class="container h-full relative mx-auto">
        <fade-in>
          <picture>
            <source
              type="image/webp"
              :srcset="require('@/assets/images/landing/oucrc-room-label.webp')"
            />
            <img
              class="oucrc-room-label absolute left-0"
              v-lazy="require('@/assets/images/landing/oucrc-room-label.png')"
              alt="電算研の部室"
            />
          </picture>
        </fade-in>
        <NuxtLink to="/news/l99fk47dvp6">
          <picture>
            <source
              type="image/webp"
              :srcset="require('@/assets/images/landing/oucrc-room-button.webp')"
            />
            <img
              class="oucrc-room-button absolute right-0 shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out"
              v-lazy="require('@/assets/images/landing/oucrc-room-button.png')"
              alt="部室に何があるの？"
            />
          </picture>
        </NuxtLink>
      </div>
    </section>
    <!-- ▲ 電算研の部室 -->

    <!-- ▼ お知らせ -->
    <section class="bg-white relative pb-16 pt-10 lg:pt-20 lg:py-20 z-20">
      <div class="container mx-auto">
        <div class="lg:grid grid-cols-5 gap-20 px-6 sm:px-10 lg:px-0">
          <div class="col-span-2 image text-center">
            <NuxtLink to="/news/qbrftlmtqk">
              <picture>
                <source
                  type="image/webp"
                  :srcset="require('@/assets/images/landing/shinkan.webp')"
                />
                <img v-lazy="require('@/assets/images/landing/shinkan.png')" alt="キャラ" />
              </picture>
            </NuxtLink>
          </div>
          <div class="col-span-3">
            <fade-in>
              <News v-if="news" :news="news" />
              <NuxtLink
                to="/news"
                class="block font-semibold lg:pb-0 pt-3 sm:pt-5 pr-2 text-sm sm:text-base text-right text-secondary tracking-widest"
              >
                もっとみる
              </NuxtLink>
            </fade-in>
          </div>
        </div>
      </div>
    </section>
    <!-- ▲ お知らせ -->

    <!-- ▼ お問い合わせ -->
    <Contact />
    <!-- ▲ お問い合わせ -->
  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useFetch } from '#imports'
import { MicroCMSListResponse } from 'microcms-js-sdk'
import { ref } from 'vue'
import type { News } from '../types/micro-cms'

useSeoMeta({
  titleTemplate: null,
})
const { data: news } = useAsyncData(async () => {
  const currentTime = new Date().toISOString()
  const response = await useFetch<MicroCMSListResponse<News>>(`/api/news`, {
    params: {
      limit: 3,
      fields: 'id,title,important,date',
      orders: '-important,-date,-createdAt',
      filters: 'date[less_than]' + currentTime,
    },
  })
  return response.data.value
})
const parallaxRef = ref<HTMLDivElement>()
const parallaxTop =
  (parallaxRef.value?.clientWidth && parallaxRef.value?.clientWidth < 640 ? 1400 : 900) -
  window.scrollY / 2 +
  'px'
</script>

<style scoped>
.oucrc-room-label {
  height: 40vh;
  top: 5vh;
}

.oucrc-room-button {
  bottom: 5vh;
  height: 8vh;
}

.parallax {
  /* パララックス効果を動的CSSで実現 */
  top: v-bind(parallaxTop);
  background-image: url(@/assets/images/landing/oucrc-room.jpg);
}
</style>
