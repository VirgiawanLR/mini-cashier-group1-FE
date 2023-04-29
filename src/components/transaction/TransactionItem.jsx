import React from "react";

function TransactionItem(props) {
  let { transaction_ID, transaction_totalprice, date } = props.data;
  return (
    <div
      className="grid grid-cols-3 bg-white text-sm
    px-4 font-bold py-[0.65rem] rounded-xl"
    >
      <span>ORDER #{props.index + 1}</span>
      <span className=" font-normal">{date[0]}</span>
      <span className="font-semibold text-end">
        {transaction_totalprice.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </span>
    </div>
  );
}

export default TransactionItem;
