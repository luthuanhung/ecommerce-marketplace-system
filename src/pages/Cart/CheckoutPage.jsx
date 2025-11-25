import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { FiChevronDown } from 'react-icons/fi';

import getCurrentUser from '../../services/userService';

const sampleItems = [
  {
    id: 1,
    title: 'Paper Film Like screen protector for Samsung Galaxy',
    price: 55.0,
    qty: 1,
    thumbnail: 'https://images.unsplash.com/photo-1580910051073-9b0b1a6d2b7e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Screen repair insurance',
    price: 23.99,
    qty: 1,
    thumbnail: 'https://images.unsplash.com/photo-1555617117-08fda1a2b3c6?q=80&w=200&auto=format&fit=crop'
  }
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [items] = useState(sampleItems);
  const [User, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [shippingMethod, setShippingMethod] = useState({ id: 'fast', name: 'Express (Fast)', cost: 16.5 });
  const [note, setNote] = useState('');
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const total = subtotal + shippingMethod.cost;

  const handlePlaceOrder = () => {
    // Navigate to payment page with order data
    navigate('/payment', {
      state: {
        orderData: {
          items,
          total,
          user: User,
          shippingMethod,
          note
        }
      }
    });
  };

  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      if (isMounted) {
        setUser(userData.user);
        setUserInfo({
            role: userData.userRole,
            phoneNumber: userData.phoneNumber
        });
      }
    };
    fetchUser();
    return () => {
        isMounted = false;
    };
}, []);

    console.log('CheckoutPage - User data:', User);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto p-6 text-black">
        <h1 className="text-2xl font-bold mb-6 text-black">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Main column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Shipping address card */}
            <section className="bg-white rounded-md shadow p-4 text-black">
              <div className="flex items-start justify-between">
                <h2 className="font-semibold">Shipping Address</h2>
                <button className="text-sm text-blue-600">Change</button>
              </div>
              <div className="mt-3 text-sm text-black">
                <p className="font-medium">Username: {User ? User.Username : ''}</p>
                <p>Phone: {userInfo ? userInfo.phoneNumber : ''}</p>
                <p className="mt-1">Address: {User ? User.Address : ''}</p>
              </div>
            </section>

            {/* Items list */}
            <section className="bg-white rounded-md shadow p-4">
              <h2 className="font-semibold mb-4">Products</h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.thumbnail} alt="thumb" className="w-20 h-20 rounded object-cover" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="text-sm font-semibold">{item.price.toFixed(3)}₫</div>
                      </div>
                      <div className="text-xs text-black mt-2">Qty: {item.qty}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping method */}
            <section className="bg-white rounded-md shadow p-4">
                <div className="flex items-center justify-between">
                <h2 className="font-semibold">Shipping Method</h2>
                <div className="text-sm text-black">Delivery estimate: <span className="font-medium">2-3 days</span></div>
              </div>
              <div className="mt-3">
                <label className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">{shippingMethod.name}</div>
                    <div className="text-xs text-black">Fast delivery to your address</div>
                  </div>
                  <div className="text-sm font-semibold">{shippingMethod.cost.toFixed(3)}₫</div>
                </label>
              </div>
            </section>

            {/* Note to seller */}
            <section className="bg-white rounded-md shadow p-4">
              <h2 className="font-semibold mb-2">Notes</h2>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note to the seller (optional)"
                className="w-full border rounded-md p-2 text-sm"
                rows={3}
              />
            </section>

          </div>

          {/* Right / Summary column */}
          <aside className="space-y-4">
            <div className="bg-white rounded-md shadow p-4">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="text-sm text-black space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">{subtotal.toFixed(3)}₫</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">{shippingMethod.cost.toFixed(3)}₫</span>
                </div>
                <div className="flex justify-between border-t pt-3 mt-3">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-red-600">{total.toFixed(3)}₫</span>
                </div>
              </div>
              <button 
                onClick={handlePlaceOrder}
                className="mt-4 w-full bg-primary hover:bg-secondary text-white py-3 rounded-md font-semibold"
              >
                Place Order
              </button>
            </div>

            <div className="bg-white rounded-md shadow p-4">
              <h4 className="font-semibold mb-2">Payment</h4>
              <div className="flex items-center justify-between text-sm text-black">
                <div>Cash on Delivery</div>
                <FiChevronDown />
              </div>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}
