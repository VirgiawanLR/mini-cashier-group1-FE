import React from "react";
import { deleteCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

function Cart(props) {
  const { item } = props;
  const dispatch = useDispatch();

  return (
    <div
      className="
bg-white
w-full
h-screen
"
    >
      CART
    </div>
  );
}

export default Cart;
