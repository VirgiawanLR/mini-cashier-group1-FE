import React from "react";

function TotalSectionItem(props) {
  return (
    <div className="flex items-center justify-between scale-y-90">
      <h1 className=" font-medium">
        {new Date(props.item.date_column).toLocaleDateString()}
      </h1>
      <h1 className="text-xs">
        {props.from === "Sales"
          ? parseInt(props.item.total_gross).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })
          : `${props.item.total_transaction} order(s)`}
      </h1>
    </div>
  );
}

export default TotalSectionItem;
