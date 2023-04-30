import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataTransaction } from "../../features/transaction/transactionSlice";
import TransactionItem from "./TransactionItem";
import LoadingSpinner from "../LoadingSpinner";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file (optional)

function TransactionContent() {
  const refOne = useRef(null);
  const dispatch = useDispatch();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const transactionList = useSelector(
    (state) => state.transaction.transactionList
  );
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showCalender, setShowCalendar] = useState(false);
  const dataPage = useSelector((state) => state.transaction.dataAndPageCount);
  const [filterClicked, setFilterClicked] = useState(false);

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  const renderTransItem = () => {
    return transactionList.map((item, index) => {
      return <TransactionItem data={item} index={index} offset={currentPage} />;
    });
  };

  const rightArrowHandler = () => {
    setCurrentPage(currentPage + 1);
  };

  const leftArrowHandler = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
    setIsPageLoading(false);
  }, []);

  const filterBtn = () => {
    setFilterClicked(true);
    setCurrentPage(0);
    dispatch(
      getDataTransaction({
        start: format(dateState[0].startDate, "yyyy/MM/dd"),
        end: format(dateState[0].endDate, "yyyy/MM/dd"),
        offset: currentPage * 9,
        limit: 9,
      })
    );
  };

  useEffect(() => {
    if (filterClicked) {
      dispatch(
        getDataTransaction({
          start: format(dateState[0].startDate, "yyyy/MM/dd"),
          end: format(dateState[0].endDate, "yyyy/MM/dd"),
          offset: currentPage * 9,
          limit: 9,
        })
      );
    } else {
      dispatch(
        getDataTransaction({
          start: null,
          end: null,
          offset: currentPage * 9,
          limit: 9,
        })
      );
    }
  }, [currentPage]);

  return (
    <>
      {isPageLoading ? (
        <LoadingSpinner bg={"light"} fill={"primary"} base={"white"} />
      ) : (
        <div className="bg-light h-screen">
          <div className="px-12 text-dark grid grid-rows-8 h-full gap-1">
            <div className="grid grid-rows-3">
              <div
                className=" row-start-2 row-span-2 flex flex-col 
             gap-1"
              >
                <h1 className=" text-2xl font-semibold">Transactions</h1>
                <div className="w-1/2 flex relative gap-2">
                  <input
                    className="w-1/2 rounded-lg tracking-tight text-xs px-2
                    text-center"
                    readOnly
                    value={`${format(
                      dateState[0].startDate,
                      "yyyy/MM/dd"
                    )} - ${format(dateState[0].endDate, "yyyy/MM/dd")}`}
                    onClick={() => {
                      setShowCalendar(!showCalender);
                    }}
                  />
                  <button
                    onClick={filterBtn}
                    className="text-white bg-dark rounded-lg
                  text-xs px-4 py-2 scale-y-90 font-semibold tracking-wider"
                  >
                    filter
                  </button>
                  <div ref={refOne}>
                    {showCalender ? (
                      <DateRange
                        className="absolute z-50 top-10 right-0 shadow-lg
                      rounded-xl"
                        editableDateInputs={true}
                        onChange={(item) => setDateState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dateState}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
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
                <button
                  disabled={currentPage === 0}
                  id="left-button"
                  onClick={leftArrowHandler}
                >
                  <i className="uil uil-arrow-left"></i>
                </button>
                <h3 className="m-auto">{currentPage + 1}</h3>
                <button
                  disabled={currentPage === dataPage.totalPage - 1}
                  id="right-button"
                  onClick={rightArrowHandler}
                >
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
