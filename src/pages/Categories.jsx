import React from "react";
import Cart from "../components/cart/Cart";
import Sidebar from "../components/Sidebar";
import Category from "../components/categories/Category";

function Categories() {
  return (
    <div className="flex">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-7/12">
        <Category />
      </div>
      <div className="w-1/4">
        <Cart />
      </div>
    </div>
  );
}

export default Categories;
