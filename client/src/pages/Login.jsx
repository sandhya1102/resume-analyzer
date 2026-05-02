import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/authSlice.js";

const Login = () => {
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // ================= INPUT CHANGE =================
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= FORM SUBMIT =================
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(form));
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleSuccess = (credentialResponse) => {
    const user = jwtDecode(credentialResponse.credential);

    localStorage.setItem("user", JSON.stringify(user));

    navigate("/dashboard");
  };

  const handleGoogleError = () => {
    console.log("Login Failed");
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }

    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">
      {/* BACKGROUND */}
      <div className="absolute w-[400px] h-[400px] bg-sky-600 rounded-full blur-[120px] opacity-30 top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-sky-600 rounded-full blur-[120px] opacity-30 bottom-[-100px] right-[-100px]" />

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-sky-500"
      >
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-8 text-white shadow-2xl">
          {/* LOGO */}
          <Link to="/">
            <h2 className="text-2xl mb-3 text-center font-bold bg-gradient-to-r from-sky-400 to-green-500 text-transparent bg-clip-text cursor-pointer">
              ResumeAI
            </h2>
          </Link>

          {/* TITLE */}
          <h2 className="text-xl font-bold text-center mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-center text-gray-400 text-sm mb-6">
            Login to analyze your resume with AI
          </p>

          {/* FORM */}
          <form className="space-y-5" onSubmit={submitHandler}>
            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-300">Email</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={changeHandler}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/5 border border-gray-700 focus:outline-none focus:border-sky-400"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <label className="text-sm text-gray-300">Password</label>

              <input
                type={show ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={changeHandler}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/5 border border-gray-700 focus:outline-none focus:border-blue-400"
              />

              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-[45px] cursor-pointer text-gray-400"
              >
                {show ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* FORGOT */}
            <p className="text-right text-sm text-gray-400 hover:text-sky-400 cursor-pointer">
              Forgot Password?
            </p>

            {/* LOGIN BUTTON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-green-500 font-semibold"
            >
              {loading ? "Please Wait..." : "Login"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-[1px] bg-white/10 w-full"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="h-[1px] bg-white/10 w-full"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>

          {/* FOOTER */}
          <p className="text-sm text-center mt-6 text-gray-400">
            Don’t have an account?{" "}
            <Link to="/register">
              <span className="text-sky-400 hover:underline cursor-pointer">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;