import React from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "../../features/cart/cartSlice";
import PopUp from "./PopUp";

function Cart() {
  const cart = useSelector((state) => state.cart.cartContent);
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.cart.modalPopUp);

  const renderCart = () => {
    return cart.map((item) => {
      return <CartItem product={item} />;
    });
  };

  const totalPrice = () => {
    const initialValue = 0;
    return cart
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.product_price * currentValue.qty;
      }, initialValue)
      .toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
  };

  return (
    <section className="bg-white h-screen overflow-y-scroll">
      {modalState ? <PopUp /> : null}
      <div className="px-4 pt-8 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div>
            <i
              className="uil uil-shopping-cart-alt text-primary
            text-5xl relative"
            >
              {" "}
              {cart.length ? (
                <div
                  className="absolute h-6 w-6 bg-secondary
                rounded-full top-0 -right-2 flex items-center
                justify-center"
                >
                  <h3
                    className="text-white text-xs font-semibold
                 tracking-widest"
                  >
                    {cart.length}
                  </h3>
                </div>
              ) : null}
            </i>
          </div>
          <h1 className="text-dark font-bold text-3xl tracking-wide">Cart</h1>
        </div>
        {cart.length > 0 ? (
          <>
            <div className="bg-lighter text-dark rounded-3xl my-8">
              <div className="flex flex-col gap-4 pt-8 px-4 pb-16">
                {renderCart()}
              </div>
            </div>
            <div className="bg-lighter text-dark rounded-3xl mt-0 mb-4">
              <div className="flex flex-col py-8 px-8">
                <h3 className="text-base font-medium">TOTAL</h3>
                <h1 className="text-xl font-bold">{totalPrice()}</h1>
              </div>
            </div>
            <button
              onClick={() => {
                dispatch(setModalState(true));
              }}
              className="bg-secondary
              text-white font-bold
              rounded-full
              py-2 px-10
              w-3/4 mx-auto
              bottom-0 mb-8
              shadow-lg
              hover:scale-105
              transition ease-in-out delay-50
              "
            >
              CHECK OUT
            </button>
          </>
        ) : null}
      </div>
    </section>
  );
}

export default Cart;
