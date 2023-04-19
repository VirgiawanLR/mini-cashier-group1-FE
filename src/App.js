import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
