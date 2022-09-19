/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { AppProps } from 'next/app'
import '@src/styles/tailwind.css'
import { ChakraProvider } from '@chakra-ui/react'

console.log('API_HOST: ', process.env.API_HOST)
console.log('APP_NAME: ', process.env.APP_NAME)

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
)
export default App
