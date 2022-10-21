/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { AppProps } from 'next/app'
import '@src/styles/tailwind.css'
import { ChakraProvider } from '@chakra-ui/react'
import IBaseProps from '@src/interfaces/IBaseProps'

console.log('API_HOST: ', process.env.API_HOST)
console.log('APP_NAME: ', process.env.APP_NAME)

// function SafeHydrate({ children }: IBaseProps) {
//   return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>
// }

const App = ({ Component, pageProps }: AppProps) => (
  // <SafeHydrate>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  // </SafeHydrate>
)
export default App
