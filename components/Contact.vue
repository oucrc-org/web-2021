<template>
  <section class="contact bg-white relative">
    <div id="map" class="overflow-hidden">
      <iframe class="md:absolute w-full z-0" title="GoogleMap" style="pointer-events:none"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2319.864736986123!2d133.9248861920379!3d34.685396222423485!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3554066d34a8412f%3A0x59f13aab8699ff49!2z44CSNzAwLTAwODIg5bKh5bGx55yM5bKh5bGx5biC5YyX5Yy65rSl5bO25Lit77yS5LiB55uu77yRIOagoeWPi-S8muaWh-WMluezu-OCr-ODqeODluajnw!5e0!3m2!1sja!2sjp!4v1614782882747!5m2!1sja!2sjp"
              frameborder="0" allowfullscreen loading="lazy"></iframe>
    </div>

    <div class="md:container xl:mx-auto">
      <div class="form">
        <h2 class="form-title">お問い合わせ</h2>

        <hr class="line">

        <div class="text-left mb-6 mt-8 px-3 sm:px-8">
          <img class="inline h-6" src="@/assets/images/landing/contact-mail.svg" alt="Mail">
          <a href="mailto:oucrc.master@gmail.com" class="font-semibold ml-4 text-secondary tracking-widest">
            oucrc.master@gmail.com
          </a>
        </div>

        <div class="text-left my-6 px-3 sm:px-8">
          <img class="inline h-6" src="@/assets/images/landing/contact-twitter.svg" alt="Twitter">
          <a href="https://twitter.com/oucrc?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" class="font-semibold ml-4 text-secondary tracking-widest"
             target="_blank" rel="noopener noreferrer">
            @oucrc
          </a>
        </div>

        <div class="text-left mb-8 mt-6 px-3 sm:px-8">
          <img class="inline h-6" src="@/assets/images/landing/contact-google-form.svg" alt="GoogleForm">
          <NuxtLink to="join" class="font-semibold ml-4 text-secondary tracking-widest">
            Google Form
          </NuxtLink>
        </div>

        <hr class="line">

        <div class="text-left mt-8 px-3 sm:px-8">
          <p class="font-bold text-secondary tracking-widest">岡山大学 サークル BOX棟（2F 209)</p>
          <p class="mt-2 text-xs text-secondary tracking-widest">2階へ上がって右の奥にあります</p>
        </div>

        <a
          href="https://www.google.com/maps/place/%E3%80%92700-0082+%E5%B2%A1%E5%B1%B1%E7%9C%8C%E5%B2%A1%E5%B1%B1%E5%B8%82%E5%8C%97%E5%8C%BA%E6%B4%A5%E5%B3%B6%E4%B8%AD%EF%BC%92%E4%B8%81%E7%9B%AE%EF%BC%91+%E6%A0%A1%E5%8F%8B%E4%BC%9A%E6%96%87%E5%8C%96%E7%B3%BB%E3%82%AF%E3%83%A9%E3%83%96%E6%A3%9F/@34.6853962,133.9248862,17.5z/data=!4m5!3m4!1s0x3554066d34a8412f:0x59f13aab8699ff49!8m2!3d34.6854759!4d133.9246382"
          class="inline-block" target="_blank" rel="noopener noreferrer">
          <DoubleLineButton label="Google Mapでみる" class="mb-8 mt-12 text-sm"/>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
#map iframe {
  height: 110vh;
  margin-top: -15vh;
}

.form {
  @apply md:absolute bg-white md:mt-40 px-6 sm:px-10 md:shadow-2xl text-center z-10
}

.form-title {
  @apply font-bold text-3xl text-center mb-10 mt-12 text-secondary tracking-wider
}

.line {
  @apply border-divider border-solid border mx-auto
}

@media (min-width: 768px) {
  .contact {
    height: 80vh;
  }
}
</style>
