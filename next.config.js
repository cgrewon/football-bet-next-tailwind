module.exports = {
  poweredByHeader: false,
  generateEtags: false,
  /**
   * Environment Variables.
   */
  env:{
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  },
  publicRuntimeConfig: {
    // APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    // API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  },
  serverRuntimeConfig: {},
}
