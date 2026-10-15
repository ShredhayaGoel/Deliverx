import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  LockKeyhole,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users/signup", {
        name: name,
        email: email,
        password: password,
        phone: phone,
        confirmpassword: confirmpassword,
        address: address,
      });

      console.log(response.data);

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setConfirmPassword("");
      setAddress("");
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
        console.log(error);
      }
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#0b1020]/80 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-violet-400/70 focus:bg-[#11162a] focus:ring-4 focus:ring-violet-500/10";

  const labelClass = "mb-2 block text-sm font-medium text-slate-200";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b16] px-4 py-10 text-white selection:bg-violet-500/40">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="login-float absolute -left-32 top-[-100px] h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="login-float absolute -right-24 bottom-[-80px] h-96 w-96 rounded-full bg-cyan-500/15 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0c_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* Signup card */}
      <div className="login-enter relative z-10 w-full max-w-lg">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500 to-indigo-700 shadow-lg shadow-violet-500/30 transition duration-500 hover:rotate-6 hover:scale-110">
            <Sparkles size={28} strokeWidth={1.8} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create your{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              account.
            </span>
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            Join us and start your journey.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9"
        >
          {/* Name */}
          <div className="mb-5">
            <label htmlFor="signup-name" className={labelClass}>
              Full name
            </label>

            <div className="group relative">
              <UserRound
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-violet-400"
              />

              <input
                id="signup-name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="signup-email" className={labelClass}>
              Email address
            </label>

            <div className="group relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-violet-400"
              />

              <input
                id="signup-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-5">
            <label htmlFor="signup-phone" className={labelClass}>
              Phone number
            </label>

            <div className="group relative">
              <Phone
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-violet-400"
              />

              <input
                id="signup-phone"
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-5">
            <label htmlFor="signup-address" className={labelClass}>
              Address
            </label>

            <div className="group relative">
              <MapPin
                size={19}
                className="absolute left-4 top-4 text-slate-500 transition-colors group-focus-within:text-violet-400"
              />

              <textarea
                id="signup-address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                rows={3}
                className={`${inputClass} resize-y`}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label htmlFor="signup-password" className={labelClass}>
              Password
            </label>

            <div className="group relative">
              <LockKeyhole
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-violet-400"
              />

              <input
                id="signup-password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="signup-confirm-password" className={labelClass}>
              Confirm password
            </label>

            <div className="group relative">
              <LockKeyhole
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-violet-400"
              />

              <input
                id="signup-confirm-password"
                type="password"
                name="confirmpassword"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Error message */}
          {Error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {Error}
            </div>
          )}

          {/* Signup button */}
          <button
            type="submit"
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 font-semibold shadow-lg shadow-violet-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-violet-500/30 active:translate-y-0"
          >
            <span className="relative z-10">Create Account</span>
            <ArrowRight
              size={19}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>

          {/* Back to login */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white active:translate-y-0"
          >
            <ArrowLeft size={17} />
            Back to Login
          </button>

          {/* Security note */}
          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={15} className="text-emerald-400" />
            Your information is protected.
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          Protected access · Your account, your space.
        </p>
      </div>
    </div>
  );
};

export default Signup;
