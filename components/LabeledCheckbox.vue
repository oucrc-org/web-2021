<template>
  <label
    :for="id"
    class="cursor-pointer font-semibold inline-block text-sm mr-3 mb-3 py-2 pl-3 pr-5 rounded-md"
    :class="[checked ? 'bg-secondary text-highlight' : 'bg-blockquote text-secondary']"
  >
    <img
      class="inline h-6 mr-2"
      :src="
        name === 'category'
          ? checked
            ? '/images/article/category-checked.svg'
            : '/images/article/category.svg'
          : checked
          ? '/images/article/series-checked.svg'
          : '/images/article/series.svg'
      "
      alt="Image"
    />
    <input
      :id="id"
      type="checkbox"
      v-model="checked"
      class="hidden"
      :value="value"
      :name="name"
      @click="runSearch"
    />
    {{ label }}
  </label>
</template>

<script lang="ts">
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
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.checked = this.checkQuery(this.id, this.name)
  },
  methods: {
    checkQuery(id: string, kind: string) {
      let value = kind === 'category' ? this.$route.params.categoryId : this.$route.params.seriesId
      if (value === 'undefined' || value === void 0) {
        return false
      } else if (typeof value === 'string') {
        return value === id
      } else if (Array.isArray(value)) {
        return value.indexOf(id) !== -1
      } else {
        return false
      }
    },
    runSearch() {
      this.$emit('search')
    },
  },
}
</script>

<style scoped></style>
