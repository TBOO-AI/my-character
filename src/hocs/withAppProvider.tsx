import { FC } from 'react'
import { useMemo } from 'react'

import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'
import {
  CoinbaseWalletAdapter,
  PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/configs/react-query'
import theme from '@/configs/theme'
import fonts from '@/configs/theme/foundations/typography/fonts'
import { GlobalStoreProvider } from '@/stores/global/state'

const coveredTheme = {
  ...theme,
  fonts,
}

function withAppProvider(AppComponent: FC<AppProps>) {
  return function WrappedAppComponent(props: AppProps) {
    const network = WalletAdapterNetwork.Mainnet
    const endpoint = useMemo(() => clusterApiUrl(network), [network])
    const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        new CoinbaseWalletAdapter(),
        // new SolflareWalletAdapter(),
      ],
      [],
    )
    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <QueryClientProvider client={queryClient}>
              <ChakraProvider resetCSS theme={coveredTheme}>
                <GlobalStoreProvider>
                  <AppComponent {...props} />
                </GlobalStoreProvider>
              </ChakraProvider>
            </QueryClientProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    )
  }
}

export default withAppProvider
