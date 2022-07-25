import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@govtechsg/sgds/css/sgds.css';
import {SSRProvider} from '@react-aria/ssr'; 
import "bootstrap-icons/font/bootstrap-icons.css";


function MyApp({ Component, pageProps }: AppProps) {
  return <SSRProvider><Component {...pageProps} /></SSRProvider>
}

export default MyApp
