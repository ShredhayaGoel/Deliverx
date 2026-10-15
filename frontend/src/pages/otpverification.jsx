import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  Mail,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b18] px-4 py-10 text-white">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px] login-float" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px] login-float" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />

      {/* OTP card */}
      <form
        onSubmit={handleVerify}
        className="login-enter relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-10"
      >
        {/* Brand icon */}
        <div className="mb-8 flex items-center justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500/20 to-blue-500/20 shadow-lg shadow-violet-500/10">
            <Mail size={30} className="text-violet-300" />

            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#17172c] bg-emerald-400 text-[#080b18]">
              <ShieldCheck size={16} />
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium tracking-wide text-violet-200">
            <Sparkles size={13} />
            ACCOUNT SECURITY
          </div>

          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Verify your{" "}
            <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
              identity.
            </span>
          </h1>

          <p className="text-sm leading-6 text-slate-400">
            Enter the 6-digit verification code sent to your email address.
          </p>
        </div>

        {/* Email display */}
        <div className="mb-7 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mt-0.5 rounded-lg bg-violet-400/10 p-2 text-violet-300">
            <Mail size={18} />
          </div>

          <div className="min-w-0">
            <p className="mb-1 text-xs text-slate-400">Verification email</p>
            <p className="break-all text-sm font-medium text-slate-200">
              {email || "Email not received"}
            </p>
          </div>
        </div>

        {/* OTP input */}
        <label
          htmlFor="otp"
          className="mb-3 block text-sm font-semibold text-slate-200"
        >
          Enter verification code
        </label>

        <input
          id="otp"
          type="text"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="000000"
          maxLength={6}
          inputMode="numeric"
          className="mb-6 w-full rounded-2xl border border-white/10 bg-[#0b1020]/80 px-4 py-5 text-center text-3xl font-bold tracking-[0.65em] text-white outline-none transition-all duration-300 placeholder:text-slate-700 focus:border-violet-400/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-500/10"
        />

        {/* Verify button */}
        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-4 font-semibold text-white shadow-lg shadow-violet-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-blue-500 hover:shadow-xl hover:shadow-violet-900/40 active:scale-[0.98]"
        >
          Verify OTP
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        {/* Resend section */}
        <div className="my-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-500">
            DIDN'T RECEIVE THE CODE?
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 font-medium text-slate-300 transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-white active:scale-[0.98]"
        >
          <RefreshCw size={16} />
          Resend OTP
        </button>

        {/* Security note */}
        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500">
          <LockKeyhole size={14} className="shrink-0 text-emerald-400" />
          Your verification code is private and secure.
        </div>
      </form>

      {/* Footer */}
      <p className="absolute bottom-4 left-4 right-4 text-center text-xs text-slate-600">
        Protected access · Your account, your space.
      </p>
    </div>
  );
};

export default OtpVerification;
