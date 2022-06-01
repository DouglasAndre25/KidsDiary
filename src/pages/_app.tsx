import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/system'
import customTheme from '../core/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <Head>
      <title>Kids Diary</title>
    </Head>
    <main>
      <ThemeProvider theme={customTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  </>
  )
}

export default MyApp
