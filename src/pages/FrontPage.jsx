import React from "react";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const navigate = useNavigate();
  return (
    <section
      className="flex flex-col justify-center items-center h-screen
    bg-primary w-full"
    >
      <div className="flex flex-col items-center">
        <h1
          className="-tracking-widest text-7xl mb-4 font-semibold
          text-white"
        >
          tokoku
        </h1>
      </div>
      <div className="w-1/2 mx-auto -mt-10 pt-48 relative">
        <div
          className="flex flex-col 
        items-center gap-12"
        >
          <button
            onClick={() => {
              navigate("/login");
            }}
            type="submit"
            id="signin"
            className="w-1/3 mx-auto shadow-dark 
          shadow-lg text-dark 
          bg-white hover:bg-slate-300
          focus:ring-4 focus:outline-none focus:ring-white 
          font-normal rounded-full text-base px-5 h-10 
          text-center tracking-[0.18rem]
          transition ease-in-out duration-200
          disabled:hover:bg-white disabled:hover:cursor-wait"
          >
            login
          </button>
          <button
            onClick={() => {
              navigate("/sign-up");
            }}
            type="submit"
            id="signin"
            className="w-1/3 mx-auto shadow-dark 
          shadow-lg text-dark 
          bg-white hover:bg-slate-300
          focus:ring-4 focus:outline-none focus:ring-white 
          font-normal rounded-full text-base px-5 h-10 
          text-center tracking-[0.18rem]
          transition ease-in-out duration-200
          disabled:hover:bg-white disabled:hover:cursor-wait"
          >
            register
          </button>
        </div>
        <div className="h-32 bg-primary"></div>
      </div>
    </section>
  );
}

export default FrontPage;
