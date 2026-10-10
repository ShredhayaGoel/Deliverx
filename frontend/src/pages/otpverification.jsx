import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/users/verifyotp",
        {
          email: email,
          otp: otp,
        },
      );

      if (response.status === 200) {
        navigate("/");
      }

      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleVerify} className="w-96 p-6 border rounded">
        <h2 className="text-2xl font-bold mb-2 text-center">Verify OTP</h2>

        <p className="text-gray-500 text-center mb-6">
          OTP sent to: {email || "Email not received"}
        </p>

        <label className="block mb-2">Enter OTP</label>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6 digit OTP"
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
