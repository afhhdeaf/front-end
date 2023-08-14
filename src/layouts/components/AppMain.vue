<template>
  <div class="app-main-container">
    <router-view class="app-main-height" />
    <footer class="copyright"></footer>© 2022 Raven Stock</footer>
  </div>
</template>

<script>
export default {
  name:'AppMain',
}
</script>

<style lang="scss" scoped>
  .app-main-container {
    position: relative;
    box-sizing: border-box;
    width: $base-width;
    overflow: hidden;
    text-align: left;
    .app-main-height {
      min-height: $app-main-min-height;
    }
    .copyright {
      min-height: $footer-copyright-height;
      line-height: $footer-copyright-height;
      color: $base-color-3;
      text-align: center;
      border-top: 1px dashed $base-border-color;
    }
  }
</style>