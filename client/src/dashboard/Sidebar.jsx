import React from "react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiClock,
  FiFileText,
  FiLogOut,
  FiBarChart2,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice.js";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxUser = useSelector((state) => state.auth.user);
  const googleUser = JSON.parse(localStorage.getItem("user"));
  const user = reduxUser || googleUser;

  const menuItems = [
    {
      id: 1,
      title: "Dashboard",
      icon: <FiHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      title: "Analyze Resume",
      icon: <FiFileText />,
      path: "/analyzeCv",
    },
    {
      id: 3,
      title: "History",
      icon: <FiClock />,
      path: "/history",
    },
    {
      id: 4,
      title: "Reports",
      icon: <FiBarChart2 />,
      path: "/reports",
    },
  ];

  const handleLogout = async () => {
    await dispatch(logoutUser());

    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="h-screen w-[280px] bg-black text-white border-r border-white/10 flex flex-col justify-between p-5 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-600 blur-[120px] opacity-20 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-600 blur-[120px] opacity-20 rounded-full"></div>

      {/* Top */}
      <div className="relative z-10">

        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-500 text-transparent bg-clip-text">
            ResumeAI 🚀
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Smart Resume Dashboard
          </p>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center font-bold text-white uppercase shrink-0">
            {user?.name?.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold">{user?.name}</h3>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-3">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link key={item.id} to={item.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${active
                    ? "bg-gradient-to-r from-blue-500 to-green-500"
                    : "hover:bg-white/5 text-gray-300"
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white transition"
        >
          <FiLogOut />
          Logout
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;