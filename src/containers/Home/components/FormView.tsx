import { useTranslation } from 'next-i18next'

import { BoxProps, Button, ButtonGroup, Input, VStack } from '@chakra-ui/react'

import { Controller, UseFormReturn } from 'react-hook-form'

import FormHelper from '@/components/FormHelper'

import { ProfileFormDataType } from '../hooks/useProfileForm'

interface FormProps extends BoxProps {
  data?: ProfileFormDataType
  formData: UseFormReturn<ProfileFormDataType>
}

export const FormView = ({
  formData: {
    register,
    setValue,
    control,
    formState: { errors },
  },
  ...basisProps
}: FormProps) => {
  const { t } = useTranslation('common')

  const formatBirthDate = (value: string) => {
    // 숫자가 아닌 문자 제거
    const numbers = value.replace(/[^\d]/g, '')

    // 날짜 형식으로 변환
    let formatted = numbers
    if (numbers.length > 4) {
      formatted = numbers.slice(0, 4) + '-' + numbers.slice(4)
    }
    if (numbers.length > 6) {
      formatted = formatted.slice(0, 7) + '-' + formatted.slice(7)
    }
    return formatted
  }

  const formatBirthTime = (value: string) => {
    // 숫자가 아닌 문자 제거
    const numbers = value.replace(/[^\d]/g, '')

    // 최대 4자리로 제한 (HHMM)
    const limitedNumbers = numbers.slice(0, 4)

    // 시간 형식으로 변환
    let formatted = limitedNumbers
    if (limitedNumbers.length > 2) {
      formatted = limitedNumbers.slice(0, 2) + ':' + limitedNumbers.slice(2)
    }
    return formatted
  }
  return (
    <VStack w={'100%'} spacing="20px" my="24px" {...basisProps}>
      {/* 생년월일 필드 */}
      <FormHelper
        label={t('form_birthdate')}
        message={{
          help: t('form_birthdate_help'),
          error: errors.birthdate?.message,
        }}
      >
        <Input
          {...register('birthdate')}
          placeholder="YYYY-MM-DD"
          maxLength={10} // YYYY-MM-DD 형식의 최대 길이
          isInvalid={!!errors.birthdate}
          type="tel"
          onChange={(e) => {
            const formatted = formatBirthDate(e.target.value)
            e.target.value = formatted
            setValue('birthdate', formatted, { shouldValidate: true }) // setValue 추가
          }}
        />
      </FormHelper>
      {/* 생년월일 필드 */}
      <FormHelper
        label={t('form_birthtime')}
        message={{
          help: t('form_birthtime_help'),

          error: errors.birthtime?.message,
        }}
      >
        <Input
          {...register('birthtime')}
          placeholder="HH:MM"
          isInvalid={!!errors.birthtime}
          maxLength={5} // HH:MM 형식의 최대 길이
          type="tel"
          onChange={(e) => {
            const formatted = formatBirthTime(e.target.value)
            e.target.value = formatted
            setValue('birthtime', formatted, { shouldValidate: true }) // setValue 추가
          }}
        />
      </FormHelper>
      <FormHelper
        label={t('form_gender')}
        message={{ help: t('form_gender_help') }}
      >
        <Controller
          name="gender"
          control={control}
          defaultValue="male"
          render={({ field: { onChange, value } }) => (
            <ButtonGroup isAttached w={'100%'}>
              <Button
                w={'50%'}
                variant={value === 'male' ? 'solid-primary' : 'outline'}
                onClick={() => onChange('male')}
              >
                {t('form_gender_male')}
              </Button>
              <Button
                w={'50%'}
                variant={value === 'female' ? 'solid-primary' : 'outline'}
                onClick={() => onChange('female')}
              >
                {t('form_gender_female')}
              </Button>
            </ButtonGroup>
          )}
        />
      </FormHelper>
    </VStack>
  )
}
