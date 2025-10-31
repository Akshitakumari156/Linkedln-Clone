import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://linkedln-clone-ecdr.onrender.com/auth/signup`, {
        name,
        email,
        password,
      });
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create Account</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-2 rounded mb-3"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 rounded mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 rounded mb-4"
          required
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Log In
          </span>
        </p>
      </form>
      
    </div>
  );
}
