<template>
  <div class="text-center">
    <p class="font-semibold relative text-black text-center text-xl tracking-widest">{{ label }}</p>
    <div class="border-double border-t-4 border-black inline-block w-12"></div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>

</style>
