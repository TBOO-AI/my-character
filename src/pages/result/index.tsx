import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

import HomeLayout from '@/components/@Layout/HomeLayout'
import Result from '@/containers/Result'

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

function ResultPage() {
  return (
    <>
      <NextSeo title="My Character" />
      <HomeLayout content={<Result />} />
    </>
  )
}

export default ResultPage
