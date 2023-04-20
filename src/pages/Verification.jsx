import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { newUserVerification } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";

function Verification() {
  const [verifStatus, setVerifStatus] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href.split("verification/")[1];
    dispatch(newUserVerification(url)).then((result) => {
      if (result.isSuccess) {
        setVerifStatus(result);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="h-screen bg-primary flex justify-center 
      items-center"
    >
      <div className="flex gap-3 text-light font-bold items-center">
        {!verifStatus.isSuccess ? (
          <>
            <div
              className="text-3xl transition-transform duration-[3000ms] 
              rotate-[720deg]"
            >
              <i className="uil uil-spinner-alt"></i>
            </div>
            <h1 className="text-lg tracking-[0.3rem]">loading</h1>
          </>
        ) : (
          <div className="flex flex-col items-center text-dark justify-center">
            <h1 className=" tracking-normal text-3xl mb-8">
              {verifStatus.message}
            </h1>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="w-full mx-auto shadow-dark shadow-lg text-white 
             bg-secondary hover:bg-tertiary
              focus:ring-4 focus:outline-none focus:ring-secondary 
              font-bold rounded-full text-base px-5 h-14 tracking-[0.18rem]
              transition ease-in-out duration-200"
            >
              SIGN-IN PAGE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verification;
