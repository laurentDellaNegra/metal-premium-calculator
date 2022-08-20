module.exports = {
  // TODO: https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31
  // ATM The plugin isn't compatible with other prettier plugins
  // plugins: [require('prettier-plugin-tailwindcss')],
  useTabs: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  semi: false,
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
