import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProdHomeCard from "./ProdHomeCard";
import {
  getProducts,
  fetchProducts,
} from "../../features/products/productSlice";
import Pagination from "../Pagination";

function ProductHome() {
  const dispatch = useDispatch();
  const selectProductList = useSelector(
    (state) => state.product.selectProductList
  );

  const renderProductList = () => {
    return selectProductList.map((product) => {
      return <ProdHomeCard product={product} />;
    });
  };

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    renderProductList();
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectProductList]);

  return (
    <div
      className=" h-screen max-h-screen
     flex flex-col gap-2 mx-auto bg-light p-10"
    >
      <div>
        <h1 className="text-2xl text-dark font-bold mb-4">Product Home</h1>
      </div>

      {/* cards & pagination */}
      <div className="flex flex-col overflow-y-auto pr-4">
        <div
          className="

            grid grid-cols-3 gap-3
             h-full w-full
            items-center
            "
        >
          {renderProductList()}
          <div className=" col-span-3">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHome;
