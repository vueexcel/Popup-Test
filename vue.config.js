const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/scss/variables.scss";
          @import "@/scss/mixins.scss";
          @import "@/scss/functions.scss";
        `
      }
    }
  }
})
