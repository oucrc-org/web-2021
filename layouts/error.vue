<template>
  <div class="">
    <div class="error container mx-auto bg-white text-center m-8" >
      <p class="text-9xl">{{ error.statusCode }}</p>
      <div v-if="error.statusCode === 404" class="text-5xl">
        ページが見つかりませんでした
      </div>
      <div v-else>
        エラーが発生しました
      </div>
    </div>
    <div class="container mx-auto text-center m-8">
      <a href="/">
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          ホームに戻る
        </button>
      </a>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "~/components/Footer";
export default {
  components: {Footer, Header},
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');

  .error{
    font-family: 'DotGothic16', sans-serif;
  }

  .text-9xl{
    font-size: 8rem;
    line-height: 1;
  }
</style>
