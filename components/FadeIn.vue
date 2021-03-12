<template>
  <div :class="{fadeIn: visible}">
    <slot v-show="visible"></slot>
  </div>
</template>

<script>
export default {
  name: 'FadeIn',
  props: {
    delay: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false
    };
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (!this.visible) {
        const top = this.$el.getBoundingClientRect().top;
        this.visible = top < window.innerHeight - this.delay;
      }
    }
  }
}
</script>

<style>
.fadeIn {
  animation: fadeIn 2s forwards;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
