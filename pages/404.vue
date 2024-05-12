<template>
  <div class="mx-auto md:container">
    <div class="error text-center m-8">
      <p class="text-9xl">404</p>
      <p class="text-5xl">ページが見つかりませんでした</p>
    </div>
    <div class="text-center m-8">
      <p class="mb-8">
        現在記事ページ生成が正常に行われないトラブルが発生しております。
        記事URLを直接入力、または外部ページからこのページにジャンプした場合、
        <a href="/articles" class="text-blue-600">記事ページ一覧</a>からお探しいただくことで記事を見られることがあります。
      </p>
      <a href="/">
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          ホームに戻る
        </button>
      </a>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');

.error {
  font-family: 'DotGothic16', sans-serif;
}

.text-9xl {
  font-size: 8rem;
  line-height: 1;
}
</style>
