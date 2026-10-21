import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/forgotpassword";
import OtpVerification from "./pages/otpverification";
import UpdatedPassword from "./pages/updatedPassword";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/updated-password" element={<UpdatedPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
