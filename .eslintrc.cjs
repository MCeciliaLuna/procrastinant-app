module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  settings: {
    react: {
      version: '18.3',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'max-len': ['error', { code: 100, ignoreUrls: true, ignoreStrings: true }],
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    indent: ['error', 2],
    'object-curly-spacing': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
  },
};
