import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/forgotpassword",
        {
          email: email,
        },
      );
      console.log(response.data);

      alert("OTP sent successfully. Please check your email.");
      if (response.status === 200) {
        navigate("/otpverification", { state: { email: email } });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Error occurred while sending OTP. Please try again.");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handlesubmit} className="w-96 p-6 border rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        <label className="block mb-2">Enter your email</label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
