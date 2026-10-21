import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdatedPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/users/updatedpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            confirmPassword,
          }),
        },
      );

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setTimeout(() => navigate("/"), 1200);
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-slate-900 p-8"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Update Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full rounded-lg bg-slate-800 p-3 text-white"
        />

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
          className="mb-4 w-full rounded-lg bg-slate-800 p-3 text-white"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={8}
          required
          className="mb-4 w-full rounded-lg bg-slate-800 p-3 text-white"
        />

        {message && <p className="mb-4 text-sm text-cyan-400">{message}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-cyan-500 p-3 font-semibold text-slate-950"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatedPassword;
