// import StarRating from "../review/StarRating"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const priceAsNumber = parseFloat(product.price_per_day);
  const finalPriceAsNumber = product.sale_percentage
    ? priceAsNumber * (1 - product.sale_percentage / 100)
    : priceAsNumber;

  const handleCardClick = () => {
    navigate(`/product/${product.product_id}`);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the button
    onAddToCart(product);
  };


    const handleClick = () => {
        navigate(`/product/${product.product_id || 1}`);
    };
    console.log("Product: "+ product)

    return (
        <>
            <div 
                onClick={handleClick}
                className="rounded-lg h-full w-full
                transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 hover:cursor-pointer hover:ring-2 ring-gray-700" 
            >
                <div className="w-full h-48 flex items-center justify-center bg-linear-to-b from-gray-300 to-gray-200 rounded-lg overflow-hidden">
                    <img
                        src={product.images[0]}
                        alt="Product Image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="p-2 line-clamp-2 wrap-break-word text-[1.2rem] font-bold">{product.name}</h2>
                {/* <div className="px-2 py-1"><StarRating modeRate={modeRate}/></div> */}
                <div className="flex justify-start items-center p-2 pt-0 text-lg md:text-2xl font-bold flex-wrap">
                    {product.sale_percentage ? (
                        <div className="flex justify-start items-center gap-2 flex-wrap">
                            <span>${finalPriceDisplay}</span>
                            {view === 'horizontal' && (
                                <span className='line-through text-gray-300 text-base md:text-xl'>${originalPriceDisplay}</span>
                            )}
                            <button className='rounded-3xl cursor-default px-3 py-1 text-sm md:text-base bg-red-100 text-red-400'>-{product.sale_percentage}%</button>
                        </div>
                    ) : (
                        <span>${originalPriceDisplay}</span>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductCard
