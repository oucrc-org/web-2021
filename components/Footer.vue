<template>
  <div class="bg-footer h-48 sm:h-64 w-full z-30 flex-grow-0">
    <NuxtLink to="/">
      <picture>
        <source
          type="image/webp"
          :srcset="require('~/assets/images/common/oucrc-label-reverse.webp')"
        />
        <img
          class="h-10 sm:h-16 mt-16 sm:mt-20 mx-auto"
          v-lazy="require('~/assets/images/common/oucrc-label-reverse.png')"
          alt="岡山大学電子計算機研究会"
        />
      </picture>
    </NuxtLink>
    <div class="text-sm text-center text-white pt-12 sm:pt-20">
      &copy; 2021 OUCRC All rights reserved
    </div>
  </div>
</template>

<script>
export default {}
</script>
