// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // 0 off, 1 warning, 2 error
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'no-debugger': 1,
    'no-warning-comments': [1, {
      'terms': ['hardcoded'], location: 'anywhere',
    }],
    'no-console': [1, {
      allow: ['warn', 'error'],
    }],
    'no-tabs': 2,
    'max-len': [1, {
      'code': 80,
      'comments': 80,
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
      'ignoreRegExpLiterals': true,
    }],
    'vue/max-attributes-per-line': [1, {
      'singleline': 2,
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      },
    }],
    'comma-dangle': [1, 'always-multiline'],
    'linebreak-style': ['error', 'unix'],
    "indent": ["error", 2],
  },
  plugins: ["vue"],
}
