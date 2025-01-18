const path = require('path')

module.exports = {
  i18n: {
    locales: ['en', 'ko'], // 지원하는 언어
    defaultLocale: 'en', // 기본 언어
    localePath: path.resolve('./public/locales'),
  },
}
