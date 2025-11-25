import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { FiCheck } from 'react-icons/fi';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // If no order data, redirect back
  useEffect(() => {
    if (!orderData) {
      navigate('/checkout');
    }
  }, [orderData, navigate]);

  const handlePayment = () => {
    // Simulate payment processing
    setShowSuccess(true);
    
    // Start countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/'); // Redirect to home after countdown
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (!orderData) return null;

  const { total, items, user } = orderData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto p-6 text-black">
        <h1 className="text-2xl font-bold mb-6">Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Payment Methods */}
          <div className="space-y-6">
            <section className="bg-white rounded-md shadow p-6">
              <h2 className="font-semibold mb-4">Select Payment Method</h2>
              
              <div className="space-y-3">
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === 'qr' ? 'border-primary bg-primary-light' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="qr"
                    checked={paymentMethod === 'qr'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">QR Code Payment</div>
                    <div className="text-sm text-gray-600">Scan to pay with banking app</div>
                  </div>
                </label>

                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === 'cod' ? 'border-primary bg-primary-light' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-sm text-gray-600">Pay when you receive</div>
                  </div>
                </label>

                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === 'card' ? 'border-primary bg-primary-light' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-gray-600">Visa, Mastercard, etc.</div>
                  </div>
                </label>
              </div>
            </section>

            {/* Order Summary */}
            <section className="bg-white rounded-md shadow p-6">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({items?.length || 0})</span>
                  <span className="font-medium">{(total - 16.5).toFixed(3)}₫</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">16.500₫</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-red-600">{total.toFixed(3)}₫</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right: QR Code / Payment Details */}
          <div>
            <section className="bg-white rounded-md shadow p-6">
              {paymentMethod === 'qr' && (
                <div className="text-center">
                  <h3 className="font-semibold mb-4">Scan QR Code to Pay</h3>
                  <div className="bg-gray-100 p-4 rounded-lg mb-4 inline-block">
                    {/* QR Code placeholder - in production, generate actual QR code */}
                    <div className="w-64 h-64 bg-white border-4 border-gray-300 flex items-center justify-center">
                      <svg className="w-56 h-56" viewBox="0 0 100 100" fill="black">
                        {/* Simple QR code pattern */}
                        <rect x="0" y="0" width="20" height="20" />
                        <rect x="80" y="0" width="20" height="20" />
                        <rect x="0" y="80" width="20" height="20" />
                        <rect x="40" y="40" width="20" height="20" />
                        <rect x="10" y="30" width="10" height="10" />
                        <rect x="70" y="30" width="10" height="10" />
                        <rect x="30" y="70" width="10" height="10" />
                        <rect x="60" y="10" width="10" height="10" />
                        <rect x="50" y="80" width="10" height="10" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Amount: <span className="font-bold text-black">{total.toFixed(3)}₫</span></p>
                  <p className="text-xs text-gray-500 mb-4">Scan this code with your banking app</p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Cash on Delivery</h3>
                  <p className="text-sm text-gray-600">You will pay {total.toFixed(3)}₫ when you receive your order</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <h3 className="font-semibold mb-4">Card Details</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full border rounded-md p-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full border rounded-md p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <input type="text" placeholder="123" className="w-full border rounded-md p-2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                    <input type="text" placeholder="JOHN DOE" className="w-full border rounded-md p-2" />
                  </div>
                </div>
              )}

              <button
                onClick={handlePayment}
                className="w-full mt-6 bg-primary hover:bg-secondary text-white py-3 rounded-md font-semibold"
              >
                Confirm Payment
              </button>
            </section>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-2">Your order has been placed successfully.</p>
              <p className="text-sm text-gray-500 mb-4">Order Total: <span className="font-semibold text-red-600">{total.toFixed(3)}₫</span></p>
              <p className="text-sm text-gray-400">Redirecting in {countdown} seconds...</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
