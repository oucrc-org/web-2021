<template>
  <div>
    <Header />
    <Nuxt class="pt-16" />
    <Footer />
  </div>
</template>

<style>
html {
  font-family:
    'Noto Sans JP',
    Roboto,
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  min-height: 100vh;
  position: relative;
}

@media (min-width: 768px) {
  html{
    padding-bottom: 400px;
  }
}

@media (max-width: 768px) {
  html{
    padding-bottom: 200px;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  outline: none;
}
</style>
