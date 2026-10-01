import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
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

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 border rounded"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Address</label>
          <textarea
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full border p-2 rounded bg-orange-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
