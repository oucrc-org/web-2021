<template>
  <section class="relative">
    <div class="absolute bg-repeat bg-white h-full w-full"></div>
    <div id="heroArea" class="relative w-full" style="height: 95vh">
      <ParticlesComponent
        id="tsparticles"
        :particlesInit="particlesInit"
        :options="particleConfig"
      />
    </div>
    <div class="absolute pt-56 sm:pt-72 text-center top-0 w-full">
      <picture>
        <source type="image/webp" srcset="/images/common/oucrc-label.webp" />
        <img
          class="fadeIn2s h-12 sm:h-20 md:h-24 mx-auto"
          src="/images/common/oucrc-label.png"
          alt="岡山大学電子計算機研究会"
        />
      </picture>
      <h2 class="fadeIn4s mt-4 sm:mt-8 text-lg sm:text-2xl tracking-widest">
        つくりたいものをつくる
      </h2>
    </div>
    <picture>
      <source type="image/webp" srcset="/images/landing/scroll.webp" />
      <img
        class="fadeIn2s1s absolute bottom-0 h-40 mx-auto left-0 right-0"
        src="/images/landing/scroll.png"
        alt="Scroll"
      />
    </picture>
  </section>
</template>

<script lang="ts">
import { loadFull } from 'tsparticles'
import { IOptions, RecursivePartial } from 'tsparticles-engine'
import { ParticlesComponent } from 'vue3-particles'
const particleConfig: RecursivePartial<IOptions> = {
  fullScreen: {
    enable: true,
    zIndex: 0,
  },
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    color: {
      value: '#595959',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#595959',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 4,
      random: true,
      anim: {
        enable: false,
        speed: 60,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#595959',
      opacity: 0.4,
      width: 0.8,
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse',
      },
      onclick: {
        enable: false,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
}

export default {
  components: {
    ParticlesComponent,
  },
  data() {
    return { particleConfig }
  },
  methods: {
    particlesInit: async (engine: any) => {
      await loadFull(engine)
    },
  },
}
</script>

<style scoped>
.bg-repeat {
  background-image: url(/images/landing/bg-repeat.svg);
  background-size: 96px 64px;
  background-position: left top;
}

.fadeIn2s {
  animation: fadeIn 2s forwards;
}

.fadeIn4s {
  animation: fadeIn 4s forwards;
}

.fadeIn2s1s {
  animation: fadeIn 2s 1s forwards;
  opacity: 0;
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
