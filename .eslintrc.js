module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  // plugins: ['@typescript-eslint']
  rules: {
    'no-undef': 'off'
  }
}
