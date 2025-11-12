
const StockStatus = ({ status, count }) => {
  const isExpired = status === 'expired';
  if (isExpired) {
    return <span className="text-sm font-semibold text-red-500">Expired</span>;
  }
  
  const statusConfig = {
    in: { text: `In Stock (${count})`, color: 'text-green-500' },
    low: { text: `Low Stock (${count})`, color: 'text-yellow-500' },
    out: { text: 'Out of Stock', color: 'text-red-500' },
  };

  const { text, color } = statusConfig[status] || {};
  
  return <span className={`text-sm ${color}`}>{text}</span>;
};
export default StockStatus;