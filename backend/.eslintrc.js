module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint'],
  'parserOptions': {
    'ecmaVersion': 9,
    'sourceType': 'module'
  },
  'extends':  ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  'rules': {
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'capitalized-comments': ['warn'],
    'eol-last': ['error', 'always'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'require-atomic-updates': 'off',
    'no-console': 'off',
    'no-trailing-spaces': ['error'],
    'no-multi-spaces': ['error'],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'comma-spacing': ['error'],
    'arrow-spacing': ['error'],
    'space-infix-ops': ['error'],
    'block-spacing': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'spaced-comment': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
  },
  'globals': {
    'describe': false,
    'beforeEach': false,
    'afterEach': false,
    'jasmine': false,
    'it': false,
    'expect': false
  }
};
