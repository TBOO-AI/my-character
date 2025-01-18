import { useMemo } from 'react'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { Box, ChakraProps, Divider, Flex, Image, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import Header from '@/components/Header'
import Splash from '@/components/Splash'
import Characters from '@/constants/Characters'

import Chart from './components/Chart'
import ShareButton from './components/ShareButton'

interface ResultProps {
  styles?: {
    container?: ChakraProps
  }
}

function Result({ styles }: ResultProps) {
  const router = useRouter()
  const { birthdate, birthtime, gender } = router.query
  const { locale } = router
  const { t } = useTranslation('common')

  const { data } = useQuery({
    queryKey: ['saju', birthdate, birthtime, gender],
    queryFn: () =>
      fetch(
        `/api/saju?birthdate=${birthdate}&birthtime=${birthtime}&gender=${gender}`,
      ).then((res) => res.json()),
  })

  const sajuData = data?.data
  const character = useMemo(() => {
    if (sajuData) {
      return Characters.find(
        (character) => character.id === sajuData.character.id,
      )
    }
    return null
  }, [sajuData])

  const characterInfo = useMemo(() => {
    return locale === 'ko' ?
        sajuData?.il_ju.content_ko
      : sajuData?.il_ju.content_en
  }, [locale, sajuData])

  const characterSaju = useMemo(() => {
    const content =
      locale === 'ko' ? sajuData?.saju.content_ko : sajuData?.saju.content_en
    return content?.replaceAll(
      '{name}',
      locale === 'ko' ? character?.name_ko : character?.name,
    )
  }, [locale, sajuData, character])

  if (!sajuData) return <Splash />
  return (
    <>
      <Flex
        {...styles?.container}
        h={'100%'}
        bg={'gray.50'}
        direction={'column'}
        pb={'120px'}
        pos={'relative'}
      >
        <Header title={t('character.title')} isBack isShare />
        <ShareButton />
        <Box id={'capture'}>
          <Flex
            direction={'column'}
            alignItems={'center'}
            px={'16px'}
            pb={'20px'}
          >
            <Text
              textStyle={'pre-body-04'}
              textAlign={'center'}
              color={'gray.500'}
              mt={'30px'}
            >
              {t('character.subtitle')}
            </Text>
            {locale === 'ko' ?
              <Box>
                <Text
                  color={character?.color}
                  textStyle={'pre-heading-01'}
                  textAlign={'center'}
                >
                  {character?.name_ko}
                </Text>
                <Text textStyle={'pre-body-05'} color={'gray.500'}>
                  ({character?.name})
                </Text>
              </Box>
            : <Text
                color={character?.color}
                textStyle={'pre-heading-01'}
                textAlign={'center'}
              >
                {character?.name}
              </Text>
            }
            <Image
              src={character?.img_md}
              alt={character?.name}
              boxSize={'230px'}
              my={'20px'}
            />
            <Box
              border={'1px solid'}
              borderColor={'gray.200'}
              borderRadius={'10px'}
              p={'15px'}
              bg={'white'}
            >
              <Text textStyle={'pre-heading-05'} mb={'10px'}>
                {characterInfo?.split('.')[0]}.
              </Text>
              <Text textStyle={'pre-body-02'} color={'gray.500'}>
                {characterInfo?.split('.').slice(1).join('.')}
              </Text>
            </Box>
          </Flex>
          <Chart data={sajuData?.oheang_rate} />
        </Box>
        <Flex direction={'column'} px={'16px'} gap={'20px'}>
          <Box
            border={'1px solid'}
            borderColor={'gray.200'}
            borderRadius={'10px'}
            p={'15px'}
            bg={'white'}
          >
            <Text textStyle={'pre-heading-05'} mb={'10px'}>
              {sajuData?.saju.most_oheang &&
                t(`character.most_oheang.${sajuData?.saju.most_oheang}`)}
            </Text>
            <Text textStyle={'pre-body-02'} color={'gray.500'}>
              {characterSaju}
            </Text>
          </Box>
          <Flex
            direction={'column'}
            border={'1px solid'}
            borderColor={'gray.200'}
            borderRadius={'10px'}
            p={'15px'}
            bg={'white'}
            gap={'10px'}
          >
            <Text textStyle={'pre-heading-03'} w={'100%'}>
              {t('character.relation.title')}
            </Text>
            <Image src={t('character.relation.image')} alt={'perspective'} />
            <Divider />
            <Text textStyle={'pre-body-02'} color={'gray.500'} mt={'15px'}>
              {t('character.relation.description')}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Result
