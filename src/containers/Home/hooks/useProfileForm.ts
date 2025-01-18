import { yupResolver } from '@hookform/resolvers/yup'

import { FieldValues, UseFormProps, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import { REGEX } from '@/constants/form/regex'

export interface ProfileFormDataType extends FieldValues {
  // 필수 필드
  birthdate: string
  birthtime: string
  gender: 'male' | 'female'
}

export type ProfileFormKeys = keyof ProfileFormDataType

/**
 * yup을 이용하여 form의 유효성 검사를 처리합니다.
 * react-hook-form과 yup을 연결해주는 yupResolver를 함께 사용합니다.
 *
 * 반복적인 validation 값은 상수로 관리되며, 각 필드의 조건에 따라 yup의 메서드를 활용하여 정의합니다.
 *
 * @see https://github.com/jquense/yup#getting-started
 * @see https://yarnpkg.com/package/@hookform/resolvers#readme
 */

export const profileFormSchema = (t: (key: string) => string) =>
  yup.object().shape({
    /**
     * @name birthdate
     * @description 정규식 매칭을 수행하며, 빈 값은 허용
     * @excludeEmptyString 정규식 조건에서 빈값은 제외한 후 검사합니다. 선택적 값이며, 입력시에 특정 정규식이 필요한 경우 사용합니다.
     *
     */

    birthdate: yup
      .string()
      .required(t('form.helper_text.birthdate.required'))
      .matches(REGEX['BIRTHDATE'].DETAIL_FORMAT, {
        excludeEmptyString: true,
        message: t('form.helper_text.birthdate.detail_format'),
      }),
    /**
     * @name birthtime
     * @description 정규식 매칭을 수행하며, 빈 값은 허용
     * @excludeEmptyString 정규식 조건에서 빈값은 제외한 후 검사합니다. 선택적 값이며, 입력시에 특정 정규식이 필요한 경우 사용합니다.
     *
     */
    birthtime: yup
      .string()
      .required(t('form.helper_text.birthtime.required'))
      .matches(REGEX['BIRTHTIME'].DETAIL_FORMAT, {
        excludeEmptyString: true,
        message: t('form.helper_text.birthtime.detail_format'),
      }),
    gender: yup
      .string()
      .oneOf(['male', 'female'] as const)
      .required(),
  })

/**
 * useForm hook을 사용하여 form의 상태 관리 및 유효성 검사를 처리하는 함수입니다.
 */
export const useProfileForm = (options?: UseFormProps<ProfileFormDataType>) => {
  const { t } = useTranslation('common')

  return useForm<ProfileFormDataType>({
    resolver: yupResolver(profileFormSchema(t)), // yup 스키마와 연결
    mode: 'onChange',
    ...options,
  })
}
