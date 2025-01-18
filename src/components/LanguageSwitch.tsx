import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { Button, ButtonGroup, useColorModeValue } from '@chakra-ui/react'

const LanguageSwitcher = () => {
  const router = useRouter()
  const { i18n } = useTranslation()
  const activeBg = useColorModeValue('gray.100', 'gray.900')

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    router.push(router.asPath, undefined, { locale: lng })
  }

  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <Button
        onClick={() => changeLanguage('en')}
        bg={i18n.language === 'en' ? activeBg : 'transparent'}
        leftIcon={<span>🇺🇸</span>}
        borderColor={'gray.200'}
      >
        EN
      </Button>
      <Button
        onClick={() => changeLanguage('ko')}
        bg={i18n.language === 'ko' ? activeBg : 'transparent'}
        leftIcon={<span>🇰🇷</span>}
        borderColor={'gray.200'}
      >
        KO
      </Button>
    </ButtonGroup>
  )
}

export default LanguageSwitcher
