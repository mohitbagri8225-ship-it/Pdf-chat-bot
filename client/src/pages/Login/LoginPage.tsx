import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 

function LoginPage() {

  const navigate = useNavigate(); 

  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    }); 
  };

  const handleOnSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("http://localhost:5000/api/v1/user/login",formData,{withCredentials:true});
      console.log(response);
      alert("log in successfull");
 
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "login failed");
      } else {
        alert("login failed");
      }
    }
  }
  return (
    <div className="min-h-screen bg-neutral-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">DocMind</h1>
          <p className="text-neutral-400 mt-2">
            Chat with your documents intelligently
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Welcome back
          </h2>

          <p className="text-neutral-400 mb-6">
            Sign in to continue to DocMind
          </p>

          <form className="space-y-5" onSubmit={handleOnSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>

              <input
              onChange={handleChange}
               name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-neutral-300">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-blue-500 hover:text-blue-400"
                >
                  Forgot password?
                </button>
              </div>

              <input
              onChange={handleChange}
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200"
            >
              Sign In
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-neutral-400 text-sm mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;