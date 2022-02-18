export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'سیماطب',
    htmlAttrs: {
      lang: 'fa'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  // loading: '~/components/Loading.vue',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/variables.css',
    '@/assets/font.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/modal.js',
    '~/plugins/axios.js',
    '~/plugins/hasRule.js',
    '~/plugins/lightbox.js',
    '~/plugins/moment.js',
    '~/plugins/pagination.js',
    '~/plugins/vue2-tiny.js',
    '~/plugins/date.js',
    '~/plugins/notify.js',
    '~/plugins/filter.js',
    {src: '~/plugins/select.js', ssr: false},
    {src: '~/plugins/chart.js', ssr: false},
    '~/plugins/client-init.js',
    '~/plugins/carousel.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-moment-jalaali',
  ],
  moment: {
    locales: ['fa']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
    // ['nuxt-lazy-load', {
    //   // Your options
    // }],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-image-crop-upload'],
  },
  server: {
    host: '0.0.0.0',
    port: 5000
  }
}
