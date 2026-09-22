import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");

  const [Password, setPassword] = useState("");

  const [Error, setError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        Name: Name,
        Email: Email,
        Password: Password,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
      setError("invalid credentuals");

      if (error.response) {
        setError(error.response.data.message);
        console.log(Error);
      } else {
        setError("An error occurred. Please try again later.");
        alert(Error);
        console.log(Error);
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handlesubmit} className="p-10 m-8 bg-amber-600">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <div className="m-2">
          <label>
            Name
            <input
              className="block p-2 mt-2 border"
              placeholder="Enter name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="m-2">
          <label>
            Email
            <input
              className="block p-2 mt-2 border"
              placeholder="Enter email"
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div className="m-2">
          <label>
            Password
            <input
              className="block p-2 mt-2 border"
              placeholder="Enter password"
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="m-2 p-2 border">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
