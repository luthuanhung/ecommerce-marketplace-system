import { Route, Routes } from 'react-router-dom'
/**********   ADD PAGE ROUTE HERE   **********/
import PrivateStorage from './pages/Resource/PrivateStorage'
import ShoppingCart from './pages/CartPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateStorage/>} />
      <Route path="/about" element={<h1>About Page</h1>} />
      <Route path="/cart" element={<ShoppingCart/>} />
    </Routes>
  )
}

export default App
