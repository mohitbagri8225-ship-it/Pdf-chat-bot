import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    userName: "",
    username:""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData);

  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        formData
      );
      console.log(response);

      alert("Signup successful 🚀");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Signup failed");
      } else {
        alert("Signup failed");
      }
    }
  }

  return (
    <div className="min-h-screen bg-neutral-800 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">DocMind</h1>
          <p className="text-neutral-400 mt-2">
            Your intelligent document assistant
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Create an account
          </h2>

          <p className="text-neutral-400 mb-6">
            Start chatting with your documents
          </p>

          <form className="space-y-5" onSubmit={handleSignUp}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Full Name
              </label>

              <input
                name="fullName"
                type="text"
                required
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>

            {/* username */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                userName
              </label>

              <input
                name="username"
                type="text"
                required
                onChange={handleChange}
                placeholder="user123"
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>

              <input
                name="email"
                type="email"
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Password
              </label>

              <input
                name="password"
                onChange={handleChange}
                required
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Confirm Password
              </label>

              <input
                onChange={handleChange}
                required
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200"
            >
              Create Account
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-neutral-400 text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;