import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import {
  Button,
  ButtonGroup,
  Center,
  ChakraProps,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

interface HeaderProps {
  title: string
  isBack?: boolean
  isShare?: boolean
  styles?: {
    container?: ChakraProps
  }
}

function Header({ title, isBack, isShare }: HeaderProps) {
  const router = useRouter()
  const { i18n } = useTranslation()
  const activeBg = useColorModeValue('gray.100', 'gray.600')

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    router.push(router.asPath, undefined, { locale: lng })
  }

  return (
    <Flex
      h={'60px'}
      alignItems={'center'}
      justifyContent={'center'}
      bg={'white'}
      position={'sticky'}
      top={'0'}
      zIndex={'100'}
      boxShadow={'0px 0px 10px 0px rgba(0, 0, 0, 0.1)'}
    >
      {isBack && (
        <Center
          boxSize={'60px'}
          position={'absolute'}
          left={'0'}
          cursor={'pointer'}
          onClick={router.back}
        >
          <Image src={'/images/icon/arrow_back.png'} boxSize={'24px'} />
        </Center>
      )}
      <Text textStyle={'pre-heading-02'} textAlign={'center'}>
        {title}
      </Text>
      {isShare && (
        <Flex alignItems={'center'} position={'absolute'} right={'15px'}>
          <ButtonGroup
            size="sm"
            isAttached
            variant="outline"
            borderColor={'gray.200'}
          >
            <Button
              onClick={() => changeLanguage('en')}
              bg={i18n.language === 'en' ? activeBg : 'transparent'}
              borderColor={'gray.200'}
            >
              <Text fontSize={'20px'}>🇺🇸</Text>
            </Button>
            <Button
              onClick={() => changeLanguage('ko')}
              bg={i18n.language === 'ko' ? activeBg : 'transparent'}
              borderColor={'gray.200'}
            >
              <Text fontSize={'20px'}>🇰🇷</Text>
            </Button>
          </ButtonGroup>
        </Flex>
      )}
    </Flex>
  )
}

export default Header
