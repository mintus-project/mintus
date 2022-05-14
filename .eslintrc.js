module.exports = {
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'vue/require-default-prop': 'off',
    quotes: ['error', 'single'],
    'max-len': ['warn', { code: 80 }],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: []
      }
    ]
  }
}
