
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ShoppingCart from './pages/Cart/CartPage';
import CheckoutPage from './pages/Cart/CheckoutPage';
import PaymentPage from './pages/Payment/PaymentPage';
import ShipperDetails from './pages/Shipper/ShipperDetails';
import SellerProductReport from './pages/Seller/SellerProductReport';
import LandingPage from './pages/Home/LandingPage';
import Promotion from './pages/promotion/Promotion';
import UserDetails from './pages/User/UserDetails';
import LoginPage from './pages/Login/loginPage';
import HomePage from './pages/Home/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>} />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <LandingPage />
        </ProtectedRoute>} />
      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>} />
      <Route path="/cart" element={
        <ProtectedRoute>
          <ShoppingCart />
        </ProtectedRoute>
      } />
      <Route path="/checkout" element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      } />
      <Route path="/payment" element={
        <ProtectedRoute>
          <PaymentPage />
        </ProtectedRoute>
      } />
      <Route path="/shipper-details" element={
        <ProtectedRoute>
          <ShipperDetails />
        </ProtectedRoute>
      } />
      <Route path="/seller-report" element={
        <ProtectedRoute>
          <SellerProductReport />
        </ProtectedRoute>
      } />
      <Route path="/promotion" element={
        <ProtectedRoute>
          <Promotion />
        </ProtectedRoute>
      } />
      <Route path="/user" element={
        <ProtectedRoute>
          <UserDetails />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App
