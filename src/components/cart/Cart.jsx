import React, { useState } from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationPopUp from "./ConfirmationPopUp";
import { newTransaction } from "../../features/transaction/transactionSlice";
import { resetCart } from "../../features/cart/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart.cartContent);
  const dispatch = useDispatch();
  const [isModalPopUp, setIsModalPopUp] = useState(false);
  const [responseProceed, setResponseProceed] = useState({ message: null });
  let response;

  const renderCart = () => {
    return cart.map((item) => {
      return <CartItem product={item} />;
    });
  };

  const renderPopUp = () => {
    return cart.map((item) => {
      return <ConfirmationPopUp product={item} />;
    });
  };

  const proceedBtnHandler = async () => {
    const proceedBtn = document.getElementById("proceed-btn");
    proceedBtn.disabled = true;
    proceedBtn.classList.add("hover:cursor-wait");
    const transaction_price =
      parseInt(totalPrice().replace(/[^0-9.-]+/g, "")) * 1000;
    console.log(transaction_price);
    const transaction_list = cart.map((item) => {
      return { product_ID: item.product_ID, qty: item.qty };
    });
    response = await dispatch(
      newTransaction({ transaction_list, transaction_price })
    );
    setResponseProceed({
      message: response.message,
      isSuccess: response.isSuccess,
      id: response.transactionID,
    });
    proceedBtn.classList.remove("hover:cursor-wait");
    proceedBtn.disabled = false;
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
      {isModalPopUp ? (
        <div
          className=" fixed h-screen w-screen top-0 left-0
          modal-container z-50 flex justify-center items-center text-dark"
        >
          <div className="bg-white px-12 py-12  rounded-2xl w-1/2 relative">
            {responseProceed.message ? (
              <div className="flex flex-col">
                {responseProceed.isSuccess ? (
                  <>
                    <div className="flex items-center justify-center gap-2">
                      <i
                        className="uil uil-check-circle text-primary
                     text-3xl"
                      ></i>
                      <p className="font-bold text-xl">success</p>
                    </div>
                    <p
                      className="mt-4 text-sm tracking-wider leading-relaxed
                     text-center"
                    >
                      {responseProceed.message}, with transaction ID{" "}
                      <span className="font-semibold">
                        {responseProceed.id}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-2">
                      <i className="uil uil-multiply text-red text-3xl"></i>
                      <p className="font-bold text-xl">failed</p>
                    </div>
                    <p
                      className="mt-4 text-sm tracking-wider leading-relaxed
                    text-center"
                    >
                      {responseProceed.message}
                    </p>
                  </>
                )}
                <button
                  onClick={() => {
                    setResponseProceed({ message: null });
                    setIsModalPopUp(false);
                    dispatch(resetCart());
                  }}
                  className="bg-secondary
                text-white font-bold
                rounded-full mt-8
                py-2 px-6
                w-1/4 mx-auto
                shadow-lg
                hover:scale-105
                transition ease-in-out delay-50
                "
                >
                  OK
                </button>
              </div>
            ) : (
              <>
                <i
                  className="uil uil-times-circle absolute top-2 
              right-4 text-lg hover:cursor-pointer"
                  onClick={() => {
                    setIsModalPopUp(false);
                  }}
                ></i>
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-xl tracking-tighter">
                    ORDER CHECK
                  </h1>
                  <p className=" text-xs tracking-widest">
                    {new Date(Date.now()).toLocaleDateString()}
                  </p>
                </div>
                <div className=" flex flex-col gap-5 mt-10">
                  {renderPopUp()}
                </div>
                <div className="flex justify-between mt-20">
                  <button
                    id="proceed-btn"
                    className="bg-secondary
              text-white font-bold
              rounded-full
              px-10
              shadow-lg
              hover:scale-105
              transition ease-in-out delay-50
              "
                    onClick={proceedBtnHandler}
                  >
                    PROCEED
                  </button>
                  <div className="flex flex-col gap-1">
                    <h3 className=" text-sm font-semibold text-right">TOTAL</h3>
                    <h1 className="font-bold">{totalPrice()}</h1>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
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
                setIsModalPopUp(true);
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
