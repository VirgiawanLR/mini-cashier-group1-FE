import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProdProdsCard from "./ProdProdsCard";
import SearchBar from "../../SearchBar";
import {
  getProducts,
  fetchProducts,
} from "../../../features/products/productSlice";
import Pagination from "../../Pagination";
import PopUpNewProduct from "./PopUpNewProduct";

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
    dispatch(fetchProducts());
    renderProductList();
  }, [selectProductList]);

  const [popupCreate, setPopupCreate] = useState(false);

  const togglePopupCreate = () => {
    setPopupCreate(!popupCreate);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [popupCreate]);

  return (
    <div>
      {/* popup - create */}
      {popupCreate && (
        <div
          className="fixed top-0 left-0 right-0 z-50 
        w-full p-4 md:inset-0 max-h-full
        modal-container flex justify-center items-center"
        >
          <div className="relative mx-auto overflow-x overflow-y-auto bg-white h-5/6 w-5/6 rounded-xl px-24 py-16">
            <div className="max-w-lg">
              <PopUpNewProduct togglePopupCreate={togglePopupCreate} />
            </div>
          </div>
        </div>
      )}

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
    py-2 px-10
    shadow-lg
    hover:scale-105
    transition ease-in-out delay-50
    "
                onClick={togglePopupCreate}
              >
                CREATE
              </button>
            </div>

            <div>
              <SearchBar />
            </div>

            <div>sort</div>

            <div>filter</div>
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
            "
          >
            {renderProductList()}
          </div>

          <div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductProducts;

{
  /* create button, search bar, filter, sort */
}
