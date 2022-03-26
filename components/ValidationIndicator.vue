<template>
  <div>
    <span v-if="!condition">❌</span>
    <span v-else>✅</span>
    <b>{{ label }}</b>
  </div>
</template>

<script>
export default {
  name: 'ValidationIndicator',
  props: {
    condition: {
      type: Boolean,
      default: false,
      required: true
    },
    label: {
      type: String,
      required: true
    },
  }
}
</script>

