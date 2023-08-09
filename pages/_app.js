import '@/styles/globals.css'
// import '@/styles/signup.css'
import GlxState from './context/glxState'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Alert from '@/components/Alert'

export default function App({ Component, pageProps }) {
  return (
    <GlxState>
      {/* <Navbar /> */}
      <Component {...pageProps} />
      <Alert />
      <Footer />
    </GlxState>
  )
}
