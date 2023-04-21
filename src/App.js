import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Verification from "./pages/Verification";
import LogIn from "./pages/LogIn";
import FrontPage from "./pages/FrontPage";

function App() {
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
