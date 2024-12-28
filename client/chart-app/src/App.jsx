import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Chart from "./Pages/Chart";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "./Pages/Avatar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setavatar" element={<Avatar />} />
        <Route path="/" element={<Chart />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
