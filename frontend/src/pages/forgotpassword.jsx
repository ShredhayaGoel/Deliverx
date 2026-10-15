import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

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
        navigate("/verify-otp", {
          state: {
            email: email,
            purpose: "forgotpassword",
          },
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Error occurred while sending OTP. Please try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b18] px-4 py-10 text-white">
      {/* Background glow effects */}
      <div className="login-float pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="login-float pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />

      {/* Forgot password card */}
      <form
        onSubmit={handlesubmit}
        className="login-enter relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-10"
      >
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500/20 to-blue-500/20 shadow-lg shadow-violet-500/10">
            <LockKeyhole size={30} className="text-violet-300" />

            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#17172c] bg-emerald-400 text-[#080b18]">
              <ShieldCheck size={16} />
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium tracking-wide text-violet-200">
            <Sparkles size={13} />
            ACCOUNT RECOVERY
          </div>

          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Forgot your{" "}
            <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
              password?
            </span>
          </h1>

          <p className="text-sm leading-6 text-slate-400">
            Don't worry. Enter your registered email and we'll send you a
            verification code to continue.
          </p>
        </div>

        {/* Email input */}
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-slate-200"
        >
          Email address
        </label>

        <div className="group mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1020]/80 px-4 transition-all duration-300 focus-within:border-violet-400/70 focus-within:ring-4 focus-within:ring-violet-500/10">
          <Mail
            size={19}
            className="shrink-0 text-slate-500 transition-colors group-focus-within:text-violet-300"
          />

          <input
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full bg-transparent text-white placeholder-gray-500
    outline-none border-none focus:ring-0
    autofill:bg-transparent"
          />
        </div>

        {/* Send OTP */}
        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-4 font-semibold text-white shadow-lg shadow-violet-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-blue-500 hover:shadow-xl hover:shadow-violet-900/40 active:scale-[0.98]"
        >
          Send OTP
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        {/* Back to login */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 font-medium text-slate-300 transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-400/10 hover:text-white active:scale-[0.98]"
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>

        {/* Security note */}
        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={15} className="shrink-0 text-emerald-400" />
          Your account security matters to us.
        </div>
      </form>

      {/* Footer */}
      <p className="absolute bottom-4 left-4 right-4 text-center text-xs text-slate-600">
        Protected access · Your account, your space.
      </p>
    </div>
  );
};

export default ForgotPassword;
