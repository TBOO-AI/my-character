import { useState } from 'react'

import { useTranslation } from 'next-i18next'

import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react'

import html2canvas from 'html2canvas'
import { GoShare } from 'react-icons/go'

function ShareButton() {
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()
  const { t } = useTranslation('common')

  const handleShare = async () => {
    setIsLoading(true)
    const captureRef = document.getElementById('capture')
    const canvas = await html2canvas(captureRef as HTMLElement)
    canvas.toBlob(async (blob: Blob | null) => {
      if (!blob) return
      const fileBits: BlobPart[] = [blob]
      const imageName: string = `tboo_share.png`
      const fileOptions: FilePropertyBag = {
        type: blob.type,
      }
      const file = new File(fileBits, imageName, fileOptions)

      try {
        await navigator.share({
          files: [file],
        })
      } catch (error) {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

        toast({
          title: isIOS ? t('share.error.ios') : t('share.error.notSupport'),
          status: 'error',
          position: 'bottom',
        })
      }
    })
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <Box
      position={'fixed'}
      bottom={'0px'}
      pb={'20px'}
      px={'26px'}
      w={'100%'}
      zIndex={'1000'}
    >
      <Button
        onClick={handleShare}
        w={'100%'}
        maxW={'448px'}
        isLoading={isLoading}
      >
        <Flex alignItems={'center'} gap={'10px'}>
          <Text>{t('share.button')}</Text>
          <GoShare />
        </Flex>
      </Button>
    </Box>
  )
}

export default ShareButton
