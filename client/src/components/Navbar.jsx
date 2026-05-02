import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* LOGO */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:text-2xl text-md font-bold bg-gradient-to-r from-sky-400 to-green-500 text-transparent bg-clip-text cursor-pointer"
        >
          ResumeAI 🚀
        </motion.h1>

        {/* BUTTONS */}
        <div className="flex items-center gap-4">
          {/* Login */}
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 text-xs md:text-md rounded-lg border text-white border-gray-400 text-gray-600 hover:bg-white hover:text-black transition"
            >
              Login
            </motion.button>
          </Link>

          {/* Signup */}
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2 text-xs md:text-md rounded-lg bg-gradient-to-r from-sky-500 to-green-500 text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
