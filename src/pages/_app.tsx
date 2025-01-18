import 'next-i18next'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { config as SEO } from '@/configs/seo/config'
import withAppProvider from '@/hocs/withAppProvider'

function App({ Component, pageProps }: any) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default withAppProvider(appWithTranslation(App))
