import React from "react";


function prodHomeCard(props) {
  const { product } = props;

  return (
    <div
      className="
        flex
        bg-dark
        rounded-full
        text-black
        justify-center
        ">

      <div>
        <p>{product.id}</p>
        <p>{product.productName}</p>
        <p>{product.productPrice}</p>
        {/* <button 
            class="
            bg-secondary 
            text-white font-bold
            rounded-full font-bold py-2 px-4
            hover:scale-95
            w-20 h-20 rounded-full" 
            onClick={() => addToCartButtonHndlr(id)}
        >Add to Cart</button> */}
      </div>

    </div>
  );
}

export default prodHomeCard;

// ada add to cart button
