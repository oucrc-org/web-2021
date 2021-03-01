<template>
  <div id="footer" class="bg-gray-900 relative z-30">
    <div class="grid md:grid-cols-5">
      <div class="col-span-1 md:col-span-2 pt-20 md:p-20 px-6 sm:px-0">
        <img src="~/assets/images/oucrc-label-reverse.png" alt="岡山大学電子計算機研究会" class="m-2 label">
      </div>
      <div class="col-span-1 md:col-span-3">

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
      min-width: 400px;
    }
  }
</style>
