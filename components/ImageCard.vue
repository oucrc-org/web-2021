<template>
  <div class="bg-white text-center">
    <NuxtLink
      v-bind:to="href"
      class="inline-block transform hover:scale-101 transition duration-500 ease-in-out w-full"
    >
      <div class="relative">
        <picture v-if="imageSrc">
          <source v-if="imageSrc" type="image/webp" :srcset="imageSrc" />
          <source v-else type="image/webp" :srcset="imageSrc" />
          <img class="object-cover shadow-lg h-56 w-full" :src="imageSrc" :alt="categoryLabel" />
        </picture>
        <picture v-else>
          <source type="image/webp" srcset="/images/article/cover.webp" />
          <img
            class="object-cover shadow-lg h-56 w-full"
            src="/images/article/cover.jpg"
            alt="NoImage"
          />
        </picture>
        <img
          class="absolute bottom-0 h-20 right-0"
          src="/images/common/polygon.svg"
          alt="Polygon"
        />
        <div
          class="absolute bg-primary font-bold py-2 px-5 text-center text-sm text-white tracking-widest"
          style="left: -8px; top: 10px"
        >
          {{ categoryLabel }}
        </div>
      </div>
      <p class="font-semibold leading-8 mt-4 px-3 text-left text-lg text-secondary tracking-widest">
        <span class="block">
          {{ description }}
        </span>
      </p>
      <DoubleLineButton label="内容を見る" class="mt-4" />
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
interface Props {
  href: string
  categoryLabel: string
  imageSrc?: string
  description: string
}
const props = defineProps<Props>()
</script>

<style scoped></style>
