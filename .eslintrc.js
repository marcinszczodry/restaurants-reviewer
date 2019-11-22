module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-closing-bracket-newline': ["error", {
      "multiline": "always"
    }],
    'vue/html-self-closing': ["error", {
      "html": {
        "void": "always",
        "normal": "any",
        "component": "always"
      },
      "svg": "never",
      "math": "never"
    }]
  },
};
