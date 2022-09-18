/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { AppProps } from 'next/app'
import '@src/styles/tailwind.css'
import { ChakraProvider } from '@chakra-ui/react'

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
)
export default App
