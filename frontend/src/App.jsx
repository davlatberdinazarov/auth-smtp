import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTPVerify from "./pages/OTP-verify";
import ResetPassword from "./pages/Reset-Password";
import { createContext, useState } from "react";
import Auth from "./pages/Auth";

export const Context = createContext();

export default function App() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  console.log(user);

  return (
    <Context.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </Context.Provider>
  );
}
