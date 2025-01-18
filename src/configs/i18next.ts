import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import nextI18NextConfig from '../../next-i18next.config'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
  ...nextI18NextConfig.i18n,
  react: {
    useSuspense: false,
  },
  supportedLngs: ['en', 'ko'],
  nonExplicitSupportedLngs: true,
  preload: ['en', 'ko'],
  returnNull: false,
} as const)

export default i18n
export { serverSideTranslations }
