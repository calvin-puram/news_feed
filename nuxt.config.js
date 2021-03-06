require('dotenv').config();
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'News Across | GlobalNews',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href:
          '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons',
        rel: 'stylesheet',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#9ccc65', height: '5' },
  /*
   ** Global CSS
   */
  css: [
    { src: 'vue-material/dist/vue-material.min.css', lang: 'css' },
    { src: '~assets/theme.scss', lang: 'scss' },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/vue-material' },
    { src: '~plugins/axios' },
    { src: '~plugins/firestore' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/dotenv', '@nuxtjs/axios', '@nuxtjs/proxy'],
  /*
   ** Build configuration
   */

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  /**
   * Axios module configuration
   */
  axios: {
    credentials: true,
    proxy: true,
  },
  /**
   * proxy configuration
   */
  proxy: {
    '/api/': {
      target: 'https://newsapi.org/v2/',
      pathRewrite: { '^/api/': '' },
    },
  },
  router: {
    middleware: ['check-auth'],
  },
};
