import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Verification from "./pages/Verification";
import LogIn from "./pages/LogIn";
import FrontPage from "./pages/FrontPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { keepLogIn } from "./features/users/userSlice";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("user_token");

  useEffect(() => {
    dispatch(keepLogIn(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verification/:token" element={<Verification />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<FrontPage />} />
      </Routes>
    </>
  );
}

export default App;
