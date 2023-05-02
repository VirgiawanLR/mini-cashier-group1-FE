import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Products from "./components/products/ProductHome";

import Verification from "./pages/Verification";
import LogIn from "./pages/LogIn";
import FrontPage from "./pages/FrontPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { keepLogIn } from "./features/users/userSlice";
import TransactionsPage from "./pages/TransactionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("user_token");
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    dispatch(keepLogIn(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        {loggedInUser.isSuccess ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />

            {/* user state => not loggedin: if user access the unauthorized 
            routes, then the user
            will be redirect into the <Home>/landing page */}
            <Route path="/*" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/verification/:token" element={<Verification />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/" element={<FrontPage />} />

            {/* user state => not loggedin: if user access the unauthorized routes, 
            then the user
            will be redirect into the <Home>/landing page */}
            <Route path="/*" element={<FrontPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
