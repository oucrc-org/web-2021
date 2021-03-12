<template>
  <div :class="{fadeIn: visible}">
    <slot v-show="visible"></slot>
  </div>
</template>

<script>
export default {
  name: 'FadeIn',
  props: {
    forward: {
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
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (!this.visible) {
        var top = this.$el.getBoundingClientRect().top;
        this.visible = top < window.innerHeight + this.forward;
      }
    }
  }
}
</script>

<style>
.fadeIn {
  animation: fadeIn 2s;
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
