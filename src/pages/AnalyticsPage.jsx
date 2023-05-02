import React from "react";
import Sidebar from "../components/Sidebar";
import AnalyticsContent from "../components/analytics/AnalyticsContent";
import Cart from "../components/cart/Cart";

function AnalyticsPage() {
  return (
    <div
      className="
flex
"
    >
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-7/12">
        <AnalyticsContent />
      </div>
      <div className="w-1/4">
        <Cart />
      </div>
    </div>
  );
}

export default AnalyticsPage;
