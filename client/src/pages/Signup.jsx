import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">
      {/* 🔥 BACKGROUND BLOBS */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600 rounded-full blur-[120px] opacity-30 top-[-100px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-pink-600 rounded-full blur-[120px] opacity-30 bottom-[-100px] right-[-100px]" />

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
      >
        <div className="bg-black/80 backdrop-blur-xl flex flex-col items-center rounded-2xl p-8 text-white shadow-2xl">
          <Link to="/">
            <h2 className="text-2xl mb-2 font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text cursor-pointer">
              ResumeAI
            </h2>
          </Link>
          {/* TITLE */}
          <h2 className="text-3xl font-bold text-center mb-2">
            Create Account 🚀
          </h2>
          <p className="text-center text-gray-400 text-sm mb-6">
            Start analyzing your resume with AI
          </p>

          {/* FORM */}
          <form className="space-y-5">
            {/* NAME */}
            <div>
              <label className="text-sm text-gray-300">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/5 border border-gray-700 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500 transition"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/5 border border-gray-700 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-500 transition"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <label className="text-sm text-gray-300">Password</label>
              <input
                type={show ? "text" : "password"}
                placeholder="Create password"
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/5 border border-gray-700 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-500 transition"
              />

              {/* 👁 TOGGLE */}
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-[45px] cursor-pointer text-gray-400 hover:text-white"
              >
                {show ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* TERMS */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <input type="checkbox" className="accent-purple-500" />
              <p>
                I agree to the{" "}
                <span className="text-purple-400 cursor-pointer">
                  Terms & Conditions
                </span>
              </p>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative w-full py-3 rounded-lg font-semibold overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"></span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition"></span>
              <span className="relative z-10">Sign Up</span>
            </motion.button>
          </form>

          {/* FOOTER */}
          <p className="text-sm text-center mt-6 text-gray-400">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-purple-400 cursor-pointer hover:underline">
                Login
              </span>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
