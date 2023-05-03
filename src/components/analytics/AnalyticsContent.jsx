import React from "react";
import TotalSection from "./TotalSection";

function AnalyticsContent() {
  return (
    <div className="bg-light h-screen">
      <div className="px-12 text-dark grid grid-rows-8 h-full gap-4">
        <div className="grid grid-rows-3">
          <h1 className=" row-start-3 text-2xl font-bold">Analytics</h1>
        </div>
        <div className="mt-4 row-span-4 grid grid-cols-2 gap-4">
          <div
            className="bg-white rounded-xl max-h-full 
                text-dark px-6 py-4 grid grid-rows-8 relative"
          >
            <TotalSection total={"Sales"} />
          </div>
          <div
            className="bg-white rounded-xl max-h-full 
                text-dark px-6 py-4 grid grid-rows-8 relative"
          >
            <TotalSection total={"Order"} />
          </div>
        </div>
        <div className=" row-span-3 mb-12 bg-white rounded-xl"></div>
      </div>
    </div>
  );
}

export default AnalyticsContent;
