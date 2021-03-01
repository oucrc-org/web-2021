<template>
  <div class="container lg:mt-16 mx-auto px-10">

    <!---------------------------------------------------  部員情報  --------------------------------------------------->

    <section class="bg-white pt-16 lg:pt-0 sm:px-12 lg:px-0">
      <div class="grid grid-cols-10 gap-4 mt-20">
        <div class="col-span-4 grid grid-cols-10 gap-4">

          <!-- ▼ メンバーアイコン -->
          <div class="col-span-4 inline-block pl-8 row-end-2">
            <img
              src="https://avatars.githubusercontent.com/u/58544849?s=460&u=9e921c5bba0462a1873f73f3d8d98dcad33a2bd7&v=4"
              class="rounded-full" alt="仮">
          </div>
          <!-- ▲ メンバーアイコン -->


          <!-- ▼ SNSリンク -->
          <div class="col-span-6 inline-block mt-2 pr-8 text-center">
            <p class="bg-highlight inline-block px-6 py-1 rounded-lg text-secondary text-sm tracking-widest">
              2019年度 入部
            </p>
            <div class="lg:text-left ml-1 xl:pl-10">
              <a href="#">
                <img src="@/assets/images/sns-twitter.png" alt="Twitter"
                     class="inline mr-1 mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out">
              </a>
              <a href="#">
                <img src="@/assets/images/sns-github.png" alt="GitHub"
                     class="inline mt-4 w-8 xl:w-10 transform hover:scale-110 transition duration-200 ease-in-out">
              </a>
              <a href="#">
                <img src="@/assets/images/sns-youtube.png" alt="YouTube"
                     class="inline ml-2 mt-4 w-6 xl:w-8 transform hover:scale-110 transition duration-200 ease-in-out">
              </a>
            </div>
          </div>
          <!-- ▲ SNSリンク -->


          <!-- ▼ メンバー名 -->
          <div class="col-span-8 col-start-2 ">
            <p class="font-bold text-3xl text-secondary tracking-widest">いけちぃ</p>
            <p class="text-lg text-subtext tracking-widest">Apple信徒</p>
          </div>
          <!-- ▲ メンバー名 -->

        </div>

        <div class="col-span-6 border-l-4 border-highlight px-12">

          <!-- ▼ 自己紹介 -->
          <div class="bg-primary font-bold inline-block py-2 px-8 text-center text-sm text-white tracking-widest">
            自己紹介
          </div>
          <p class="leading-8 mt-4 text-secondary tracking-widest">
            自己紹介をAPIから取ってくるううううううううううううううううううううううあああああああああああ。あｆっふぁふぁふぁふぁふぁふぁふぁっふぁふぁふぁふぁふぁふぁ！あああああああああああああああ。いいいいいいいいいい？
            ううううううううううううう！
          </p>
          <!-- ▲ 自己紹介 -->

        </div>
      </div>

      <!-- ▼ この人が書いた記事 -->
      <div class="pt-16 mb-24 mx-8 sm:mx-12 text-center">
        <div class="container mx-auto">
          <Title label="この人が書いた記事" class="mb-4"/>
          <div class="grid sm:grid-cols-3 gap-8">
            <ArticleCard href="/article?tag=programming" tag="プログラミング" class="py-4" v-for="n in 5"
                         :img-path="require('@/assets/images/cover-programming.png')"
                         description="スマホアプリやゲームなどを、個人で開発したり、グループでプロジェクトを立ち上げたりしています！"/>
          </div>
        </div>
      </div>
      <!-- ▲ この人が書いた記事 -->

    </section>

    <!---------------------------------------------------  部員情報  --------------------------------------------------->


    <!-----------------------------------------------  この人が書いた記事  ----------------------------------------------->


    <!-----------------------------------------------  この人が書いた記事  ----------------------------------------------->

  </div>
</template>

<script>
export default {}
</script>

<style module>

</style>
