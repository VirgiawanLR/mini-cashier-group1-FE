import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailTransaction } from "../../features/transaction/transactionSlice";
import ConfirmationPopUp from "../cart/ConfirmationPopUp";

function TransactionItem(props) {
  let { transaction_ID, transaction_totalprice, date } = props.data;
  const [isModalPopUp, setIsModalPopUp] = useState(false);
  const singleTransaction = useSelector(
    (state) => state.transaction.singleTransaction
  );
  const dispatch = useDispatch();
  let response;

  const singleTransClicked = async () => {
    response = await dispatch(getDetailTransaction(transaction_ID));
    setIsModalPopUp(true);
  };

  const renderPopUp = () => {
    return singleTransaction.itemList.map((item) => {
      return <ConfirmationPopUp product={item} />;
    });
  };

  return (
    <>
      {isModalPopUp ? (
        <div
          className=" fixed h-screen w-screen top-0 left-0
        modal-container z-50 flex justify-center items-center text-dark"
        >
          <div className="bg-white px-12 py-12 rounded-2xl w-1/2 relative">
            <i
              className="uil uil-times-circle absolute top-2 
              right-4 text-lg hover:cursor-pointer"
              onClick={() => {
                setIsModalPopUp(false);
              }}
            ></i>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-bold text-lg scale-y-90">Order ID:</h1>
                <h3 className="text-xs scale-y-110">{transaction_ID}</h3>
              </div>
              <p className=" text-xs tracking-widest">
                {singleTransaction.date[0]} {singleTransaction.date[1]}
              </p>
            </div>
            <div className=" flex flex-col gap-5 mt-10">{renderPopUp()}</div>
            <div className="flex justify-between mt-20">
              <div></div>
              <div className="flex flex-col gap-1">
                <h3 className=" text-sm font-semibold text-right">TOTAL</h3>
                <h1 className="font-bold ">
                  {singleTransaction.total_price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h1>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className="grid grid-cols-3 bg-white text-sm
      px-4 font-bold py-[0.60rem] rounded-xl hover:cursor-pointer"
        onClick={singleTransClicked}
      >
        <span>ORDER #{props.offset * 9 + props.index + 1}</span>
        <span className=" font-normal">{date[0]}</span>
        <span className="font-semibold text-end">
          {transaction_totalprice.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </span>
      </div>
    </>
  );
}

export default TransactionItem;
