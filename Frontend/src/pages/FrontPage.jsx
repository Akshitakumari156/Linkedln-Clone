import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/linkedln.png"
export default function FrontPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Logo and Title */}
      <div className="flex items-center gap-3 mb-8">
        <img
          src={Logo}
          alt="LinkedIn"
          className="w-12 h-12 shadow-sm"
        />
        <h1 className="text-4xl font-bold text-blue-700 tracking-wide">
          Linked<span className="text-blue-500">In</span>
        </h1>
      </div>

      {/* Tagline */}
      <p className="text-gray-600 text-lg mb-10 text-center max-w-md">
        Connect with professionals, grow your network, and unlock new
        opportunities every day.
      </p>

      {/* Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          Log In
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200"
        >
          Sign Up
        </button>
      </div>

    </div>
  );
}
