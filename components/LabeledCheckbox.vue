<template>
  <label :for="keys" class="font-semibold inline-block text-sm mr-3 mb-3 py-2 pl-3 pr-5 rounded-md"
         :class="[checked ? 'bg-secondary text-highlight' : 'bg-blockquote text-secondary']">
    <img class="inline h-6 mr-2"
         :src="name === 'category' ? ( checked ? require('@/assets/images/category-checked.svg') : require('@/assets/images/category.svg') ) : ( checked ? require('@/assets/images/series-checked.svg') : require('@/assets/images/series.svg') )"
         alt="Image">
    <input :id="keys" type="checkbox" v-model="checked" class="hidden" :value="value" :name="name" @click="runSearch">
    {{ label }}
  </label>
</template>

<script>
export default {
  name: 'LabeledCheckbox',
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
    },
    keys: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    runSearch(){
      this.$emit('search');
    }
  },
  asyncData(){
    console.log(this.props.checked)
    return {
      checked: this.props.checked
    }
  }
}
</script>

<style scoped>

</style>
