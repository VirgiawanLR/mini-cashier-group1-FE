import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQtyItem,
  removeItem,
  subtractQtyItem,
} from "../../features/cart/cartSlice";

function CartItem(props) {
  let { product_ID, product_name, product_price, qty } = props.product;
  const dispatch = useDispatch();
  const cartContent = useSelector((state) => state.cart.cartContent);

  const addBtnHandler = () => {
    let itmIndex = cartContent.findIndex(
      (product) => product.product_ID === product_ID
    );
    dispatch(addQtyItem(itmIndex));
  };

  const substractBtnHandler = () => {
    let itmIndex = cartContent.findIndex(
      (product) => product.product_ID === product_ID
    );
    dispatch(subtractQtyItem(itmIndex));
    if (qty < 2) {
      dispatch(removeItem(itmIndex));
    }
  };

  return (
    <div className="flex gap-6">
      <div className="w-1/2 grid grid-cols-3 place-items-center">
        <div
          className="flex items-center justify-center rounded-full
             bg-red h-4 w-4 text-white"
        >
          <button onClick={substractBtnHandler}>-</button>
        </div>
        <h2 className="font-semibold">{qty}x</h2>
        <div
          className="flex items-center justify-center rounded-full
             bg-secondary h-4 w-4 text-white"
        >
          <button onClick={addBtnHandler}>+</button>
        </div>
      </div>
      <div className="w-5/6">
        <div className="text-sm flex flex-col">
          <h2 className="font-semibold">{product_name}</h2>
          <p className="text-xs tracking-wider">
            {(product_price * qty).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
