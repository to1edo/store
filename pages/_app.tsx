import '@/styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import {lightTheme} from '@/themes'
import { SWRConfig } from 'swr'
import { UIProvider, CartProvider } from '@/context';
import { Authprovider } from '@/context/auth'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
      value={{
        // refreshInterval: 500,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <Authprovider>

        <UIProvider>
          <CartProvider>

            <ThemeProvider theme={lightTheme}>
              <CssBaseline/>
              <Component {...pageProps} />
            </ThemeProvider>

          </CartProvider>
        </UIProvider>
        
      </Authprovider>
    </SWRConfig>
  )
}
