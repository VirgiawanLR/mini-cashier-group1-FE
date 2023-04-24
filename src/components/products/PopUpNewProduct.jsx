import React from "react";

function PopUpNewProduct() {
  return (
    <div>
      <div>PopUpNewProduct</div>

      <div>
        {/* Popup BG */}
        <div className="bg-dark h-screen w-screen bg-opacity-25">
          {/* Popup Box */}
          <div className="bg-white w-24 h-24 rounded-full">
            {/* title & close button */}
            <div>
              <p className="">Create new product</p>
              <button
                className=""
                onClick={() => {
                  dispatch(close());
                }}
              >
                CLOSE
              </button>
            </div>
            {/* form & upload     */}
            <div>form & upload</div>
            {/* create button */}
            <div>
              <button
                className=""
                onClick={() => {
                  dispatch(create());
                }}
              >
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUpNewProduct;

// klik tombol create
// popup create isTrue
// klik create product
// popup create isFalse