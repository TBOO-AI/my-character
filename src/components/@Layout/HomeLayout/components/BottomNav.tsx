import React from 'react'

import { useRouter } from 'next/router'

import { Flex, Text } from '@chakra-ui/react'

import {
  BiCalendarCheck,
  BiCartAlt,
  BiCategoryAlt,
  BiLayer,
  BiLeaf,
} from 'react-icons/bi'
import { PiMagicWandLight } from 'react-icons/pi'

const NAV = [
  {
    icon: BiLeaf,
    label: 'Fortune',
    path: '/',
  },
  {
    icon: BiCalendarCheck,
    label: 'Quest',
    path: '/quest',
  },
  {
    icon: BiLayer,
    label: 'NFT',
    path: '/nft',
  },
  {
    icon: PiMagicWandLight,
    label: 'Items',
    path: '/items',
  },
  {
    icon: BiCategoryAlt,
    label: 'Mypage',
    path: '/mypage',
  },
]
const BottomNav = () => {
  const router = useRouter()
  return (
    <Flex
      bg="white"
      w="100%"
      borderTop="1px solid"
      borderTopColor="gray.200"
      py={'10px'}
      pos="sticky"
      bottom="0"
      zIndex={'999'}
    >
      {NAV.map((nav, idx) => {
        const isActive = router.pathname === nav.path
        return (
          <Flex
            key={idx}
            w="100%"
            direction="column"
            align="center"
            cursor="pointer"
            gap={'2px'}
            opacity={isActive ? 1 : 0.2}
            onClick={() => router.push(nav.path)}
          >
            <nav.icon size="22px" />
            <Text textStyle={'pre-caption-01'}>{nav.label}</Text>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default BottomNav
