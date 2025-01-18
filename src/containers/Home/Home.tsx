import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { Box, Button, ChakraProps, Flex, Text } from '@chakra-ui/react'

import LanguageSwitcher from '@/components/LanguageSwitch'

import { FormContainer } from './components/FormContainer'
import { FormView } from './components/FormView'
import { useProfileForm } from './hooks/useProfileForm'

interface HomeProps {
  styles?: {
    container?: ChakraProps
  }
}

function Home({ styles }: HomeProps) {
  const isLoading = false
  const router = useRouter()
  const formData = useProfileForm()

  const { t } = useTranslation('common')

  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = formData

  const onSubmit = handleSubmit(
    (data) => {
      const { birthdate, birthtime, gender } = data
      console.log(birthdate, birthtime, gender)
      router.push({
        pathname: '/result',
        query: {
          birthdate: birthdate,
          birthtime: birthtime,
          gender: gender,
        },
      })
    },
    (error) => {
      console.log(error)
    },
  )

  return (
    <Flex
      {...styles?.container}
      h={'100%'}
      bg={'white'}
      direction={'column'}
      px={'20px'}
      pt={'80px'}
      pb={'40px'}
    >
      <Box pos={'absolute'} top={'20px'} right={'15px'}>
        <LanguageSwitcher />
      </Box>
      <Text textStyle={'pre-heading-02'} whiteSpace={'pre-line'}>
        {t('home_title')}
      </Text>
      <FormContainer
        h={'100%'}
        mt={'40px'}
        isDisable={!isDirty || !isValid}
        onConfirm={onSubmit}
        buttonContent={
          <Button
            isLoading={isLoading}
            mt={'auto'}
            w={'100%'}
            onClick={onSubmit}
            type={'submit'}
          >
            {t('form_submit')}
          </Button>
        }
        content={<FormView formData={formData} />}
      />
    </Flex>
  )
}

export default Home
