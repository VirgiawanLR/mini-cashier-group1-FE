import React from "react";

function ConfirmationPopUp(props) {
  let { product_name, product_price, qty } = props.product;
  return (
    <div className="flex justify-between text-sm">
      <div className="w-3/4 grid grid-cols-3">
        <h3 className="font-bold">{qty}x</h3>
        <h3 className=" font-medium tracking-widest">{product_name}</h3>
        <h3 className="text-gray-400">
          {product_price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </h3>
      </div>
      <h3 className="font-medium w-1/4 text-end">
        {(product_price * qty).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </h3>
    </div>
  );
}

export default ConfirmationPopUp;
