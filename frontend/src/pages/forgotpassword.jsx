import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  return (
    <div className="flex justify-center mt-20">
      <form className="w-96 p-6 border rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        <label className="block mb-2">Enter your email</label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
