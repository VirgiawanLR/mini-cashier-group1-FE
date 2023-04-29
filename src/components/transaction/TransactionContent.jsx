import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataTransaction } from "../../features/transaction/transactionSlice";
import TransactionItem from "./TransactionItem";
import LoadingSpinner from "../LoadingSpinner";

function TransactionContent() {
  const dispatch = useDispatch();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const transactionList = useSelector(
    (state) => state.transaction.transactionList
  );

  useEffect(() => {
    dispatch(getDataTransaction({ offset: currentPage, limit: 9 }));
    setIsPageLoading(false);
  }, []);

  const renderTransItem = () => {
    return transactionList.map((item, index) => {
      return <TransactionItem data={item} index={index} />;
    });
  };

  return (
    <>
      {isPageLoading ? (
        <LoadingSpinner bg={"light"} fill={"primary"} base={"white"} />
      ) : (
        <div className="bg-light h-screen">
          <div className="px-12 text-dark grid grid-rows-8 h-full gap-1">
            <div className="grid grid-rows-3">
              <h1 className=" row-start-3 text-2xl font-semibold">
                Transactions
              </h1>
            </div>
            <div className=" row-span-6 mt-6 flex flex-col gap-2">
              <div className="grid grid-cols-3 px-4 scale-y-95 font-bold">
                <span>Order ID</span>
                <span>Date</span>
                <span className=" text-end">Price</span>
              </div>
              {renderTransItem()}
            </div>
            <div className="grid grid-cols-7 text-primary">
              <div className=" col-start-4 col-span-1 grid grid-cols-3">
                <button className="">
                  <i className="uil uil-arrow-left"></i>
                </button>
                <h3 className="m-auto">1</h3>
                <button className="">
                  <i className="uil uil-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionContent;
