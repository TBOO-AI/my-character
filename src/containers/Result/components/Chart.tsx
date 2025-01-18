import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

import { Box, Flex, Text, VStack } from '@chakra-ui/react'

// ResponsivePie를 동적 임포트로 변경
const ResponsivePie = dynamic(
  () => import('@nivo/pie').then((mod) => mod.ResponsivePie),
  {
    ssr: false,
  },
)

function Chart({ data }: { data: any }) {
  const { t } = useTranslation('common')
  const DATA = [
    {
      id: t('character.chart.option_1'),
      label: t('character.chart.option_1'),
      value: data?.water,
      color: '#363D39',
    },
    {
      id: t('character.chart.option_2'),
      label: t('character.chart.option_2'),
      value: data?.wood,
      color: '#3BD98D',
    },
    {
      id: t('character.chart.option_3'),
      label: t('character.chart.option_3'),
      value: data?.fire,
      color: '#FF5E2C',
    },
    {
      id: t('character.chart.option_4'),
      label: t('character.chart.option_4'),
      value: data?.gold,
      color: '#8465FF',
    },
    {
      id: t('character.chart.option_5'),
      label: t('character.chart.option_5'),
      value: data?.ground,
      color: '#FFDA23',
    },
  ]

  return (
    <Box w={'100%'} mt={'10px'}>
      <Text textStyle={'pre-heading-03'} w={'100%'} pl={'16px'}>
        {t('character.chart.title')}
      </Text>
      <Flex h={'min(50vw, 250px)'} gap={'0px'}>
        <Box w={{ base: '45%', sm: '50%' }}>
          <ResponsivePie
            data={DATA}
            colors={['#363D39', '#3BD98D', '#FF5E2C', '#8465FF', '#FFDA23']}
            margin={{ right: 20, left: 20 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            enableArcLabels={false}
            enableArcLinkLabels={false}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
          />
        </Box>

        <VStack
          w={{ base: '55%', sm: '50%' }}
          justifyContent={'center'}
          pr={'16px'}
        >
          {DATA.map((item, index) => (
            <Flex key={index} w={'100%'} alignItems={'center'}>
              <Box
                boxSize={'14px'}
                bg={item.color}
                borderRadius={'full'}
                borderWidth={'1px'}
                borderColor={'gray.200'}
                mr={'6px'}
              />
              <Text
                textStyle={{ base: 'pre-caption-02', sm: 'pre-body-05' }}
                color={'gray.700'}
              >
                {item.label}
              </Text>
              <Text
                textStyle={{ base: 'pre-caption-03', sm: 'pre-caption-01' }}
                ml={'auto'}
                color={'gray.500'}
              >
                {item.value}%
              </Text>
            </Flex>
          ))}
        </VStack>
      </Flex>
    </Box>
  )
}

export default Chart
