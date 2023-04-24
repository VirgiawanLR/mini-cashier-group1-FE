import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProdProdsCard from "./ProdProdsCard";
import SearchBar from "../SearchBar";
import {
  getProducts,
  fetchProducts,
} from "../../features/products/productSlice";
import Pagination from "../Pagination";

function ProductProducts() {
  const dispatch = useDispatch();
  const selectProductList = useSelector(
    (state) => state.product.selectProductList
  );

  const renderProductList = () => {
    return selectProductList.map((product) => {
      return <ProdProdsCard product={product} />;
    });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    renderProductList();
    dispatch(fetchProducts());
  }, [selectProductList]);

  return (
    <div className=" h-screen flex flex-col gap-2 mx-auto bg-light p-10">
      <div>
        <h1 className="text-2xl font-bold bg-red">Products</h1>
      </div>

      <div>

<div className="flex justify-between">
    <div>
    <button
            className="
    bg-secondary
    text-white font-bold
    rounded-full
    py-2 px-5
    shadow-lg
    hover:scale-105
    transition ease-in-out delay-50
    "
          >
            CREATE
          </button>
    </div>

<div>
    <SearchBar />
</div>

<div>
    sort
</div>

<div>
    filter
</div>

</div>
</div>

      {/* cards & pagination */}
      <div className="flex flex-col">
        
        <div
          className="

            grid grid-cols-3 gap-3
            bg-dark
            p-5 h-full w-full
            items-center
            ">
          {renderProductList()}
        </div>
        
        <div>
          <Pagination />
        </div>
      
      </div>
    </div>
  );
}

export default ProductProducts;

{/* create button, search bar, filter, sort */}
