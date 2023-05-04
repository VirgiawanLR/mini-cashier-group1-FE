import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file (optional)
import LoadingSpinner from "../LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import {
  getGrossIncome,
  getTotalOrder,
} from "../../features/transaction/transactionSlice";
import TotalSectionItem from "./TotalSectionItem";

function TotalSection(props) {
  const grossList = useSelector((state) => state.transaction.totalGrossList);
  const orderList = useSelector((state) => state.transaction.totalOrderList);
  const refOne = useRef(null);
  const dispatch = useDispatch();
  const [showCalender, setShowCalendar] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  const ifSales = async (start, end) => {
    let response = await dispatch(getGrossIncome({ start, end }));
    if (response.message) {
      setIsPageLoading(false);
    }
  };

  const ifOrder = async (start, end) => {
    let response = await dispatch(getTotalOrder({ start, end }));
    if (response.message) {
      setIsPageLoading(false);
    }
  };

  const renderItem = () => {
    if (props.total === "Sales") {
      return grossList.map((item) => {
        return <TotalSectionItem item={item} from={"Sales"} />;
      });
    } else {
      return orderList.map((item) => {
        return <TotalSectionItem item={item} from={"Order"} />;
      });
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
    if (props.total === "Sales") {
      ifSales(null, null);
    } else {
      ifOrder(null, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showCalender) {
      setIsPageLoading(false);
      if (props.total === "Sales") {
        ifSales(dateState[0].startDate, dateState[0].endDate);
      } else {
        ifOrder(dateState[0].startDate, dateState[0].endDate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateState[0].startDate, dateState[0].endDate]);

  return (
    <>
      {isPageLoading ? (
        <LoadingSpinner bg={"white"} fill={"dark"} base={"light"} />
      ) : (
        <>
          <div className="mt-2 flex justify-between items-center">
            <h1 className="font-bold">Total {props.total}</h1>
            <input
              className=" rounded-lg tracking-tight text-xs py-1
              text-center shadow scale-x-90 hover:cursor-pointer"
              readOnly
              value={`${format(
                dateState[0].startDate,
                "yyyy/MM/dd"
              )} - ${format(dateState[0].endDate, "yyyy/MM/dd")}`}
              onClick={() => {
                setShowCalendar(!showCalender);
              }}
            />
          </div>
          <div ref={refOne} className="absolute -right-6 z-50 scale-75">
            {showCalender ? (
              <DateRange
                className="rounded-xl"
                editableDateInputs={true}
                onChange={(item) => setDateState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateState}
              />
            ) : null}
          </div>
          <section
            className="bg-white h-52 row-start-2 row-span-full mt-4
             overflow-y-auto flex flex-col gap-4 text-sm pr-4 py-0"
          >
            {renderItem()}
          </section>
        </>
      )}
    </>
  );
}

export default TotalSection;
