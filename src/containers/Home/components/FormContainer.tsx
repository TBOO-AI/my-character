import { ReactNode } from 'react'

import { StackProps, VStack } from '@chakra-ui/react'

interface FormContainerProps extends Omit<StackProps, 'content'> {
  content: ReactNode
  buttonContent?: ReactNode
  onConfirm: () => void
  isDisable: boolean
}
export const FormContainer = ({
  content,
  onConfirm,
  buttonContent,
  isDisable,
  ...basisProps
}: FormContainerProps) => {
  return (
    <VStack as={'form'} onSubmit={onConfirm} {...basisProps}>
      {content}
      {buttonContent}
    </VStack>
  )
}
