import React from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'

import HomeLayout from '@/components/@Layout/HomeLayout'
import Home from '@/containers/Home'

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

function HomePage() {
  return (
    <>
      <NextSeo />
      <HomeLayout content={<Home />} footer={null} />
    </>
  )
}

export default HomePage
