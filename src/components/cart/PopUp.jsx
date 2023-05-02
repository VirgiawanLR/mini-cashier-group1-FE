import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart, setModalState } from "../../features/cart/cartSlice";
import {
  getDataTransaction,
  newTransaction,
} from "../../features/transaction/transactionSlice";
import PopupItem from "./PopupItem";

function PopUp() {
  const cart = useSelector((state) => state.cart.cartContent);
  const dispatch = useDispatch();
  const [responseProceed, setResponseProceed] = useState({ message: null });
  let response;

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

  const renderPopUp = () => {
    return cart.map((item) => {
      return <PopupItem product={item} />;
    });
  };

  return (
    <>
      (
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
                    <span className="font-semibold">{responseProceed.id}</span>
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
                  dispatch(setModalState(false));
                  dispatch(resetCart());
                  dispatch(
                    getDataTransaction({
                      start: null,
                      end: null,
                      offset: 0 * 9,
                      limit: 9,
                    })
                  );
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
                  dispatch(setModalState(false));
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
              <div className=" flex flex-col gap-5 mt-10">{renderPopUp()}</div>
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
      )
    </>
  );
}

export default PopUp;
