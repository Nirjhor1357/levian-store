import '../styles/globals.css'
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CartProvider } from '../components/CartContext'
import CartDrawer from '../components/CartDrawer'

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Header />
      <CartDrawer />
      <Component {...pageProps} />
      <Footer />
    </CartProvider>
  )
}
