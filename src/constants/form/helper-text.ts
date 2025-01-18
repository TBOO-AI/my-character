import i18next from 'i18next'

export const getHelperText = () => ({
  BIRTHDATE: {
    COMMON: i18next.t('form:helper_text.birthdate.common'),
    DETAIL_FORMAT: i18next.t('form:helper_text.birthdate.detail_format'),
  },
  BIRTHTIME: {
    COMMON: i18next.t('form:helper_text.birthtime.common'),
    DETAIL_FORMAT: i18next.t('form:helper_text.birthtime.detail_format'),
  },
})
