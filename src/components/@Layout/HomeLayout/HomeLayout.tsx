import React from 'react'

import { Box, Center, ContainerProps, Flex } from '@chakra-ui/react'

import LanguageSwitcher from '@/components/LanguageSwitch'

import BottomNav from './components/BottomNav'

interface HomeLayoutProps {
  header?: JSX.Element
  footer?: JSX.Element | null
  content?: JSX.Element
  containerProps?: ContainerProps
}
const HomeLayout = ({
  //
  header,
  footer = <BottomNav />,
  content,
}: HomeLayoutProps) => {
  return (
    <Flex w={'100%'}>
      <Flex
        w={'100%'}
        direction={'column'}
        maxW={'500px'}
        minH={'100vh'}
        mx={'auto'}
        pos={'relative'}
      >
        {header}
        <Box minH={`calc((var(--vh, 1vh) * 100 - ${footer ? '64px' : '0px'}))`}>
          {content}
        </Box>
      </Flex>
    </Flex>
  )
}

export default HomeLayout
