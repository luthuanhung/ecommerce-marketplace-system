

const OrderSummary = ({ subtotal }) => {
  const shipping = 10.00;
  const taxRate = 0.08; // 8%
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-10">
      <h2 className="text-xl font-semibold text-black mb-4">Order Summary</h2>
      
      <div className="space-y-3 text-gray-500">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-black">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-black">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
          <span className="text-black">${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <hr className="border-gray-700 my-4" />
      
      <div className="flex justify-between items-center text-lg font-bold text-white mb-6">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      
      <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;