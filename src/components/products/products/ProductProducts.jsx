import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProdProdsCard from "./ProdProdsCard";
import SearchBar from "../../SearchBar";
import CategoryDropdown from "../products/CategoryDropdown";
import {
  getProducts,
  fetchProducts,
  sortProductAZ,
  sortProductZA,
} from "../../../features/products/productSlice";
import Pagination from "../../Pagination";
import PopUpNewProduct from "./PopUpNewProduct";

function ProductProducts() {
  // main functions & declarables
  const dispatch = useDispatch();
  const selectProductList = useSelector(
    (state) => state.product.selectProductList
  );
  const categoryList = useSelector((state) => state.product.categoryList);
  const allProductList = useSelector((state) => state.product.allProductList);

  const renderProductList = () => {
    return selectProductList.map((product) => {
      return <ProdProdsCard product={product} />;
    });
  };

  // useStates
  const [popupCreate, setPopupCreate] = useState(false);
  const [toggleSortAZ, setSortAZ] = useState(false);
  const [toggleSortZA, setSortZA] = useState(false);
  // const [search, setSearch] = useState("");

  // useEffects
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  // useEffect AZ
  useEffect(() => {
    if (toggleSortAZ == true) {
      dispatch(sortProductAZ());
      renderProductList();
    } else if (toggleSortAZ == false) {
      dispatch(getProducts());
      renderProductList();
    }
  }, [toggleSortAZ]);

  // useEffect ZA
  useEffect(() => {
    if (toggleSortZA == true) {
      dispatch(sortProductZA());
      renderProductList();
    } else if (toggleSortZA == false) {
      dispatch(getProducts());
      renderProductList();
    }
  }, [toggleSortZA]);

  // useEffect pagination
  useEffect(() => {
    dispatch(fetchProducts());
    renderProductList();
  }, [selectProductList]);

  // toggles
  const togglePopupCreate = () => {
    setPopupCreate(!popupCreate);
  };

  const sortAZHandler = () => {
    setSortAZ(!toggleSortAZ);
  };

  const sortZAHandler = () => {
    setSortZA(!toggleSortZA);
  };

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
          <div className="flex justify-between items-center">
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
              <CategoryDropdown categoryList={categoryList} />
            </div>
            {/* button divs */}
            <div>
              {/* filter */}
              <button className="p-2 w-11 h-11">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M19,2H5A3,3,0,0,0,2,5V6.17a3,3,0,0,0,.25,1.2l0,.06a2.81,2.81,0,0,0,.59.86L9,14.41V21a1,1,0,0,0,.47.85A1,1,0,0,0,10,22a1,1,0,0,0,.45-.11l4-2A1,1,0,0,0,15,19V14.41l6.12-6.12a2.81,2.81,0,0,0,.59-.86l0-.06A3,3,0,0,0,22,6.17V5A3,3,0,0,0,19,2ZM13.29,13.29A1,1,0,0,0,13,14v4.38l-2,1V14a1,1,0,0,0-.29-.71L5.41,8H18.59ZM20,6H4V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z"
                    fill="#0f534c"
                    class="color000 svgShape"
                  ></path>
                </svg>
              </button>
              {/* sort AZ */}
              <button className="p-2 w-11 h-11" onClick={sortAZHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M5 11c.6 0 1-.4 1-1V9h2v1c0 .6.4 1 1 1s1-.4 1-1V7c0-1.7-1.3-3-3-3S4 5.3 4 7v3c0 .6.4 1 1 1zm2-5c.6 0 1 .4 1 1H6c0-.6.4-1 1-1zM5 16h1.6l-2.3 2.3c-.3.3-.4.7-.2 1.1.1.4.5.6.9.6h4c.6 0 1-.4 1-1s-.4-1-1-1H7.4l2.3-2.3c.3-.3.4-.7.2-1.1-.1-.4-.5-.6-.9-.6H5c-.6 0-1 .4-1 1s.4 1 1 1zm11.3 2.7c.2.2.5.3.7.3s.5-.1.7-.3l2-2c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-.3.3V6c0-.6-.4-1-1-1s-1 .4-1 1v9.6l-.3-.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2 2z"
                    fill="#0f534c"
                    class="color000 svgShape"
                  ></path>
                </svg>
              </button>
              {/* sort ZA */}
              <button className="p-2 w-11 h-11" onClick={sortZAHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M5 20c.6 0 1-.4 1-1v-1h2v1c0 .6.4 1 1 1s1-.4 1-1v-3c0-1.7-1.3-3-3-3s-3 1.3-3 3v3c0 .6.4 1 1 1zm2-5c.6 0 1 .4 1 1H6c0-.6.4-1 1-1zM5 7h1.6L4.3 9.3c-.3.3-.4.7-.2 1.1.1.4.5.6.9.6h4c.6 0 1-.4 1-1s-.4-1-1-1H7.4l2.3-2.3c.3-.3.4-.7.2-1.1-.1-.4-.5-.6-.9-.6H5c-.6 0-1 .4-1 1s.4 1 1 1zm11.3 11.7c.2.2.5.3.7.3s.5-.1.7-.3l2-2c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-.3.3V6c0-.6-.4-1-1-1s-1 .4-1 1v9.6l-.3-.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2 2z"
                    fill="#0f534c"
                    class="color000 svgShape"
                  ></path>
                </svg>
              </button>
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
