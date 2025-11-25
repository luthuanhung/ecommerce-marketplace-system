import React, { useState } from 'react';
import { FiSearch, FiPlus, FiMinus, FiTrash2, FiMoreVertical } from 'react-icons/fi';

import getCurrentUser from '../../services/userService';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import OrderSummary from "../../components/order/OrderSummary";
import CartItem from "../../components/cart/CartItem";

const initialCartItems = [
  {
    id: 1,
    name: 'Wireless ANC Headphones',
    price: 129.99,
    stockStatus: 'in',
    stockCount: 50,
    color: 'White',
    size: 'One Size',
    expiryDate: null,
    // --- New Link ---
    imageUrl: 'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Ergonomic Office Chair',
    price: 349.00,
    stockStatus: 'low',
    stockCount: 5,
    color: 'Grey',
    size: 'Large',
    expiryDate: null,
    // --- New Link ---
    imageUrl: 'https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quantity: 1,
  },
  {
    id: 3,
    name: '4K UHD Gaming Monitor',
    price: 499.50,
    stockStatus: 'in',
    stockCount: 30,
    color: 'Black',
    size: '27-inch',
    expiryDate: null,
    // --- New Link ---
    imageUrl: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quantity: 1,
  },
  {
    id: 4,
    name: 'Mechanical RGB Keyboard',
    price: 85.99,
    stockStatus: 'in',
    stockCount: 100,
    color: 'Black',
    size: 'Full Size',
    expiryDate: null,
    // --- New Link ---
    imageUrl: 'https://images.unsplash.com/photo-1626958390898-162d3577f293?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quantity: 1,
  },
  {
    id: 5,
    name: 'External SSD 1TB',
    price: 110.00,
    stockStatus: 'out',
    stockCount: 0,
    color: 'Silver',
    size: 'Compact',
    expiryDate: null,
    // --- New Link ---
    imageUrl: 'https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quantity: 2,
  },
  {
    id: 6,
    name: 'Vitamin C Serum',
    price: 25.00,
    stockStatus: 'in',
    stockCount: 20,
    color: 'Clear',
    size: '30ml',
    expiryDate: '2024-10-31',
    // --- New Link ---
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661693591879-fbdd89fad6cd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quantity: 1,
  },
];

export default function ShoppingCart() {
  const [items, setItems] = useState(initialCartItems);
  
  // --- State Handlers ---
  const handleUpdateQuantity = (id, delta) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  // --- Calculations ---
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
        <Header />
        <div className="min-h-screen bg-white text-primary p-4 md:p-10">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-black mb-6">Your Shopping Cart</h1>
            
            <div className="flex flex-col lg:flex-row lg:gap-8">
            
            {/* Left Column: Cart Items */}
            <div className="grow lg:w-2/3">
                {/* Search Bar */}
                <div className="relative mb-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiSearch className="text-gray-500" />
                </span>
                <input
                    type="text"
                    placeholder="Search cart items by name, color, or size..."
                    className="w-full bg-white border border-gray-700 text-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                </div>
                
                {/* Items List */}
                <div className="space-y-4">
                {items.map(item => (
                    <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                    />
                ))}
                </div>
            </div>
            
            {/* Right Column: Order Summary */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
                <OrderSummary subtotal={subtotal} />
            </div>
            
            </div>
        </div>
        </div>

        <Footer />
    </div>
  );
}