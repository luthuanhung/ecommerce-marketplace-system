import React, { useState } from 'react';
import { FiSearch, FiPlus, FiMinus, FiTrash2, FiMoreVertical } from 'react-icons/fi';

import StockStatus from "./StockStatus";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const isExpired = item.expiryDate && new Date(item.expiryDate) < new Date();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-lg shadow-md gap-4 md:gap-6">
      
      {/* --- Column 1: Product Info --- */}
      {/* On desktop, add 'grow' to take up leftover space */}
      <div className="flex items-center w-full md:grow">
        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4 shrink-0" />
        <div className="grow">
          {/* Fixed text color to be visible on white bg */}
          <h3 className="text-black font-semibold">{item.name}</h3>
          <p className="text-gray-500 text-sm">Price: ${item.price.toFixed(2)}</p>
          <StockStatus status={isExpired ? 'expired' : item.stockStatus} count={item.stockCount} />
          {/* Fixed text color */}
          <p className="text-gray-500 text-sm md:hidden mt-1">Color: {item.color}</p>
        </div>
      </div>

      {/* --- Column 2: Details --- */}
      {/* Add 'shrink-0' and a fixed width 'md:w-36' for alignment */}
      <div className="hidden md:block text-sm text-gray-500 shrink-0 md:w-36">
        <p>Size: {item.size}</p>
        <p>Color: {item.color}</p>
        {item.expiryDate && !isExpired && <p>Exp. Date: {item.expiryDate}</p>}
      </div>
      
      {/* --- Column 3: Price, Quantity, & Actions --- */}
      {/* 'shrink-0' stops this block from shrinking */}
      {/* On desktop, 'md:w-auto' and 'md:gap-6' create space *between* the 3 items */}
      <div className="flex items-center justify-between md:justify-end w-full md:w-auto shrink-0 md:gap-6">
        
        {/* Total Price: Give it a fixed width and right-align text */}
        <p className="text-black font-semibold text-lg md:w-24 md:text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        
        {/* Quantity Selector: Add 'shrink-0' to be safe */}
        <div className="flex items-center bg-white border-2 border-border-primary rounded-full shrink-0">
          <button
            onClick={() => onUpdateQuantity(item.id, -1)}
            disabled={item.quantity === 1}
            className="p-1.5 rounded-full text-black hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiMinus size={16} />
          </button>
          <span className="px-4 text-black font-medium">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, 1)}
            className="p-1.5 rounded-full text-black hover:bg-primary-light"
          >
            <FiPlus size={16} />
          </button>
        </div>
        
        {/* Action Buttons: Give container a fixed width and 'justify-end' */}
        <div className="flex items-center gap-2 md:w-16 justify-end">
          <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-400">
            <FiTrash2 size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-300">
            <FiMoreVertical size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartItem;