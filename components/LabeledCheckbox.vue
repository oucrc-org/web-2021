<template>
  <label :for="key" class="font-semibold inline-block text-sm mx-1 my-1 py-2 pl-4 pr-5 rounded-md"
         :class="[checked ? 'bg-secondary text-highlight' : 'bg-blockquote text-secondary']">
    <img class="inline h-6 mr-2"
         :src="name === 'category' ? ( checked ? require('@/assets/images/category-checked.svg') : require('@/assets/images/category.svg') ) : ( checked ? require('@/assets/images/series-checked.svg') : require('@/assets/images/series.svg') )"
         alt="Image">
    <input :id="key" type="checkbox" v-model="checked" class="hidden" :value="value" :name="name">
    {{ label }}
  </label>
</template>

<script>
export default {
  name: 'LabeledCheckbox',
  data() {
    return {
      checked: false,
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
