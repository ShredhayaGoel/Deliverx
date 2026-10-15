import { useState } from "react";
import axios from "axios";
import {
  Mail,
  LockKeyhole,
  ArrowRight,
  Sparkles,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");

  const [Password, setPassword] = useState("");

  const [Error, setError] = useState("err1233");

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email: Email,
        password: Password,
      });

      console.log(response.data);
      navigate("/dashboard");

      setName("");
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      console.log(error);
      setError("invalid credentuals");

      if (error.response) {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
        alert(Error);
        console.log(Error);
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/resendotp",
        { email: Email },
      );

      console.log(response.data);
      alert("OTP resent successfully. Please check your email.");
      navigate("/verify-otp", {
        state: {
          email: Email,
          purpose: "login",
        },
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b16] px-4 py-10 text-white selection:bg-violet-500/40">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="login-float absolute -left-32 top-[-100px] h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="login-float absolute -right-24 bottom-[-80px] h-96 w-96 rounded-full bg-cyan-500/15 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0c_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* Login card */}
      <div className="login-enter relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500 to-indigo-700 shadow-lg shadow-violet-500/30 transition duration-500 hover:rotate-6 hover:scale-110">
            <Sparkles size={28} strokeWidth={1.8} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              back.
            </span>
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            Sign in to continue your journey.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handlesubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9"
        >
          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="login-email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email address
            </label>

            <div className="group relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-violet-400"
              />

              <input
                id="login-email"
                className="w-full rounded-xl border border-white/10 bg-[#0b1020]/80 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-violet-400/70 focus:bg-[#11162a] focus:ring-4 focus:ring-violet-500/10"
                placeholder="you@example.com"
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label
              htmlFor="login-password"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Password
            </label>

            <div className="group relative">
              <LockKeyhole
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-violet-400"
              />

              <input
                id="login-password"
                className="w-full rounded-xl border border-white/10 bg-[#0b1020]/80 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-violet-400/70 focus:bg-[#11162a] focus:ring-4 focus:ring-violet-500/10"
                placeholder="Enter your password"
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Forgot Password + Send OTP */}
          <div className="mb-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-violet-300"
            >
              Forgot Password?
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              className="group flex items-center gap-1.5 text-sm font-semibold text-violet-300 transition-colors duration-300 hover:text-cyan-300"
            >
              <Mail
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              Send OTP
            </button>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 font-semibold shadow-lg shadow-violet-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-violet-500/30 active:translate-y-0"
          >
            <span className="relative z-10">Sign in</span>
            <ArrowRight
              size={19}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Try another way
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Alternative login methods */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                // Connect your phone-login page or handler here.
              }}
              className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-violet-500/10"
            >
              <Phone
                size={18}
                className="text-violet-300 transition-transform group-hover:rotate-12"
              />
              Phone
            </button>

            <button
              type="button"
              onClick={() => {
                // Connect Google sign-in here when configured.
              }}
              className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-500/10"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm font-bold text-[#4285F4] transition-transform group-hover:rotate-12">
                G
              </span>
              Google
            </button>
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-semibold text-violet-300 transition-colors duration-300 hover:text-cyan-300"
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Security note */}
          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={15} className="text-emerald-400" />
            Secure sign-in to your account
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          Protected access · Your account, your space.
        </p>
      </div>
    </div>
  );
};

export default Login;
