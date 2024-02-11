module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['@combeenation/eslint-config', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['react-refresh'],
  rules: {},
};
