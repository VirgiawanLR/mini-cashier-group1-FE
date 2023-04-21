import React from "react";


function ProdHomeCard(props) {
  const { product } = props;

  return (
    <div
      className="
        bg-dark
        rounded-xl
        p-5
        text-white
        h-max w-full
        ">

      <div>
        {/* image
        name
        price */}
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

export default ProdHomeCard;

// ada add to cart button
