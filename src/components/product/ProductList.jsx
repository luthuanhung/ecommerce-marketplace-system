import ProductCard from "./ProductCard"
import { useState } from "react"
import { useSearchParams } from "react-router-dom";

function ProductList({ View = "horizontal", Products = [], modeRate = false }) {
    const getView = useMemo(() =>{
        switch (View.toLowerCase()) {
            case "horizontal":
                return 'h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-evenly';
            case "vertical":
                return 'h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 justify-evenly';
        }
    }, [View]);
    const [page, setPage] = useState(1);
    const itemQuantity = View === "horizontal" ? 4 : 15;

    const startIdx = (page - 1) * itemQuantity;
    const endIdx = startIdx + itemQuantity;
    const visibleProducts = Products.slice(startIdx, endIdx);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const filteredProducts = visibleProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className={getView(View)}> 
                {filteredProducts.map((product, i) => (
                    <ProductCard key={startIdx + i} product={product} modeRate={modeRate} view={View}/>
                ))}
            </div>
        </>
    )
}
export default ProductList