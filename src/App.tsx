import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './components/cart/CartContext'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Shop from './components/shop/Shop'
import ProductDetail from './components/productdetails/ProductDetails'
import Cart from './components/cart/Cart'
import Footer from './components/footer/Footer'
import Checkout from './components/checkout/Checkout'
import Blog from './components/blog/Blog'
import Address from './components/address/Address'


export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/account" element={<Address />} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  )
}