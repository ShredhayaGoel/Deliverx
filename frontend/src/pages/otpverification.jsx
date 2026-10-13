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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition duration-300 hover:shadow-2xl"
      >
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
            ✉️
          </div>
        </div>

        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Verify OTP
        </h2>

        <p className="mb-6 text-center text-sm text-gray-500">
          Enter the verification code sent to
          <span className="mt-1 block break-all font-semibold text-gray-800">
            {email || "Email not received"}
          </span>
        </p>

        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Enter 6-digit OTP
        </label>

        <input
          type="text"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="••••••"
          maxLength={6}
          inputMode="numeric"
          className="mb-5 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-4 text-center text-2xl font-bold tracking-[0.6em] text-gray-800 outline-none transition placeholder:text-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          Verify OTP
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">
            DIDN'T RECEIVE THE CODE?
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-700 transition hover:border-blue-400 hover:bg-blue-100 active:scale-95"
        >
          ↻ Resend OTP
        </button>

        <p className="mt-5 text-center text-xs text-gray-400">
          For your security, never share your OTP with anyone.
        </p>
      </form>
    </div>
  );
};

export default OtpVerification;
