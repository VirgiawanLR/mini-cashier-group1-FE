import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, addQtyItem } from "../../features/cart/cartSlice";

function ProdHomeCard(props) {
  const { product } = props;
  const dispatch = useDispatch();
  const cartContent = useSelector((state) => state.cart.cartContent);

  const addtoCart = () => {
    let qty;
    let itmIndex;
    const { product_ID, product_name, product_price } = product;
    let filteredCart = cartContent.filter((product, index) => {
      if (product.product_ID === product_ID) {
        qty = product.qty;
        itmIndex = index;
        return true;
      } else {
        return false;
      }
    });
    if (filteredCart.length > 0) {
      qty += 1;
      dispatch(addQtyItem(itmIndex));
    } else {
      qty = 1;
      dispatch(addItemToCart({ product_ID, product_name, product_price, qty }));
    }
  };

  return (
    // 1 - master div
    <div
      className="
        bg-white
        rounded-xl
        p-5 h-full w-full
        text-dark
        "
    >
      {/*  2 - photo, texts, button */}
      <div
        className="
      flex flex-col gap-2 justify-between relative
      "
      >
        {/* photo */}
        <div>
          <img
            src="https://img.freepik.com/free-photo/assorted-mixed-fruits_74190-6961.jpg?w=2000&t=st=1682074158~exp=1682074758~hmac=cbfe0dfd363e5a4b432ac462e87c9a06760de9de14e78edfdf30a7d3f994e26b"
            alt="placeholder image"
            className="w-full h-auto"
          />
        </div>

        {/* 3 - texts & button */}
        <div
          className="
        flex justify justify-between"
        >
          {/* text */}
          <div>
            <p className="font-bold text-lg">{product.product_name}</p>
            <p>
              {product.product_price
                .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
                .replace(/\D00$/, "")}
            </p>
          </div>
          {/* button */}
          <div className="relative h-18 w-18">
            <button
              id="add-to-cart-btn"
              onClick={addtoCart}
              className="absolute bottom-0 right-0 p-2.5 w-12 h-12 rounded-full bg-secondary hover:bg-tertiary bg-center bg-contain"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14,18a1,1,0,0,0,1-1V15a1,1,0,0,0-2,0v2A1,1,0,0,0,14,18Zm-4,0a1,1,0,0,0,1-1V15a1,1,0,0,0-2,0v2A1,1,0,0,0,10,18ZM19,6H17.62L15.89,2.55a1,1,0,1,0-1.78.9L15.38,6H8.62L9.89,3.45a1,1,0,0,0-1.78-.9L6.38,6H5a3,3,0,0,0-.92,5.84l.74,7.46a3,3,0,0,0,3,2.7h8.38a3,3,0,0,0,3-2.7l.74-7.46A3,3,0,0,0,19,6ZM17.19,19.1a1,1,0,0,1-1,.9H7.81a1,1,0,0,1-1-.9L6.1,12H17.9ZM19,10H5A1,1,0,0,1,5,8H19a1,1,0,0,1,0,2Z"
                  fill="#ffffff"
                  className="color000 svgShape"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdHomeCard;
