import '@/styles/globals.css'
// import '@/styles/signup.css'
import GlxState from '../context/glxState'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Alert from '@/components/Alert'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import MobileNav from '@/components/MobileNav'


export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      const random = Math.floor(Math.random() * 40) + 20
      setProgress(random)

    })
    router.events.on("routeChangeComplete", () => {
      setProgress(100)
    })
  }, [])

  return (
    <GlxState>
      <LoadingBar
        color='#CFFAFE'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
      <MobileNav />
      <Component {...pageProps} />
      <Alert />
      <Footer />
    </GlxState>
  )
}
