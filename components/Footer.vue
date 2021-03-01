<template>
  <div id="footer" class="bg-gray-900 w-full z-30">
    <div class="w-full">
      <div class="pt-20 px-10 md:px-40">
        <img src="~/assets/images/oucrc-label-reverse.png" alt="岡山大学電子計算機研究会" class="m-20 label" style="margin: 0 auto;">
      </div>
    </div>
    <div class="text-sm text-center text-white pt-20">&copy; 2021 OUCRC All rights reserved</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  #footer{
    background-color: rgb(59, 59, 59);
    height: 400px;
    position: absolute;/*←絶対位置*/
    bottom: 0; /*下に固定*/
  }

  @media (min-width: 768px) {
    .label{
      min-width: 350px;
    }
  }
</style>
