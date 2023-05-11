import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getTopProductByCategory,
} from "../../features/transaction/transactionSlice";
import LoadingSpinner from "../LoadingSpinner";

function TopCategories() {
  const categories = useSelector((state) => state.transaction.categories);
  const topProduct = useSelector((state) => state.transaction.topProduct);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const dispatch = useDispatch();
  console.log(categories);

  const renderOptions = () => {
    return categories.data.map((item) => {
      return <option value={item.category_ID}>{item.category_name}</option>;
    });
  };

  const renderTopProducts = () => {
    return topProduct.data.map((item) => {
      return (
        <div
          className="w-full h-15 rounded-lg bg-primary text-white
          text-sm flex flex-col justify-center px-4 leading-[0.8]"
        >
          <h1 className="font-bold tracking-wider">{item.product_name}</h1>
          <h3 className="text-sm font-normal scale-y-95">
            Total Ordered:{" "}
            <span className=" font-medium">{item.total_ordered}</span>x
          </h3>
        </div>
      );
    });
  };

  const delayedDispatch = async () => {
    await dispatch(getCategories());
    await dispatch(getTopProductByCategory(0));
    setIsPageLoading(false);
  };

  useEffect(() => {
    delayedDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isPageLoading ? (
        <LoadingSpinner bg={"white"} fill={"dark"} base={"light"} />
      ) : (
        <div className="py-4 px-8 h-full grid grid-rows-5 gap-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold scale-y-[0.97]">TOP Products</h1>
            <select
              name="category-filter"
              id="category-filter"
              className="px-4 py-1 text-xs bg-white shadow-md rounded-lg w-40"
              onChange={(e) =>
                dispatch(getTopProductByCategory(e.target.value))
              }
            >
              <option value="0">All</option>
              {renderOptions()}
            </select>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 gap-2 px-6 row-span-4">
            {renderTopProducts()}
          </div>
        </div>
      )}
    </>
  );
}

export default TopCategories;
