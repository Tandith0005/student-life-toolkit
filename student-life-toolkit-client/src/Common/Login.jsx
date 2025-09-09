import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Providers/AuthContext";
import { CircleLoader } from "react-spinners";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { login, loginWithGoogle, loading, setLoading } =
    useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Firebase login
    try {
      const result = await login(form.email, form.password);
      toast.success(`Welcome, ${result.user.email}!`);
      navigate(location.state?.from || "/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <Link to={"/"} className="text-[#f43f5e]">{`<--Go Back`}</Link>
        <h2 className="text-3xl font-bold text-center my-4 text-[#f43f5e]">
          Login to Student Life Toolkit
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Access your schedule, budget, and more!
        </p>
        {error && (
          <p className="text-red-500 text-center mb-4">
            {error + `If you don't have an account, please sign up`}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full p-2 border-2 rounded border-dotted border-[#f43f5e] focus:border-[#f43f5e] focus:outline-none"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              type="submit"
              className="w-full bg-[#f43f5e] text-white font-semibold py-2 px-4 rounded hover:bg-[#eb1c3f] transition duration-300 cursor-pointer"
            >
              {loading ? (
                <CircleLoader color="white" size={20} className="disabled" />
              ) : (
                "Login"
              )}
            </button>
          </motion.div>
          <div>
            <SocialLogin
              loginWithGoogle={loginWithGoogle}
              loading={loading}
              setLoading={setLoading}
              toast={toast}
              navigate={navigate}
              location={location}
            />
          </div>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signUp"
            state={{ from: location.state?.from }}
            className="text-[#f43f5e] cursor-pointer hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
