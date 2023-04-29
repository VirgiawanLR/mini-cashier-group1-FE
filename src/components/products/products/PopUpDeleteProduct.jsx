import React from "react";
import { deleteProduct } from "../../../features/products/productSlice";
import { useDispatch } from "react-redux/es/exports";

function PopUpDeleteProduct(props) {
  const { togglePopupDelete, product } = props;
  const dispatch = useDispatch();

  return (
    <div>
      <div className="grid grid-rows-2 gap-10 place-items-center">
        {/* text */}
        <div className="flex flex-col gap-2 text-xl text-dark items-center">
          <p>Are you sure you want to delete</p>
          <p className="inline">
            <span className="font-bold">{product.product_name}</span>
            <span> ?</span>
          </p>
        </div>
        {/* buttons */}
        <div className="flex flex-row gap-5 justify-center">
          <button
            className=" 
          bg-red
          text-white font-bold
          rounded-full
          py-2 px-10
          shadow-lg
          hover:scale-105
          transition ease-in-out delay-50
          "
            onClick={() => dispatch(deleteProduct(product.product_ID))}
          >
            DELETE
          </button>
          <button
            className=" 
          bg-primary
          text-white font-bold
          rounded-full
          py-2 px-10
          shadow-lg
          hover:scale-105
          transition ease-in-out delay-50
          "
            onClick={togglePopupDelete}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUpDeleteProduct;
