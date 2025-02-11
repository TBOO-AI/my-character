/* eslint-disable no-useless-escape */
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

import { ColorModeScript } from '@chakra-ui/react'

import config from '@/configs/theme/config'
import { GASetter } from '@/utils/analytics/analytics'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  redirectIEtoEdge() {
    return {
      __html: `
      if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
        window.location = 'microsoft-edge:' + window.location;
        setTimeout(function() {
          window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
        }, 1);
      }`,
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={this.redirectIEtoEdge()} />
          {GASetter()}
          <link rel="stylesheet" href="https://use.typekit.net/zxj8eus.css" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
