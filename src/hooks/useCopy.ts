import { useToast } from '@chakra-ui/react'

export const useCopy = () => {
  const toast = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copied to clipboard',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return { copyToClipboard }
}
