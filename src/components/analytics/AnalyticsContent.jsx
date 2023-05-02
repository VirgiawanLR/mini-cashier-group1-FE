import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

function AnalyticsContent() {
  const [isPageLoading, setIsPageLoading] = useState(false);

  return (
    <>
      {isPageLoading ? (
        <LoadingSpinner bg={"light"} fill={"dark"} base={"white"} />
      ) : (
        <div className="bg-light h-screen">
          <div></div>
        </div>
      )}
    </>
  );
}

export default AnalyticsContent;
