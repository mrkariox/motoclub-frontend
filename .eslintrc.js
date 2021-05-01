module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'no-undef': 'off'
  }
}
