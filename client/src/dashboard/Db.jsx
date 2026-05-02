import React from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { useSelector } from "react-redux";

const Db = () => {
  const reduxUser = useSelector((state) => state.auth.user);

  const googleUser = JSON.parse(localStorage.getItem("user"));

  const user = reduxUser || googleUser;
  
  const stats = [
    {
      id: 1,
      title: "Resumes Analyzed",
      value: "24",
      icon: <FiFileText />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: 2,
      title: "Average Score",
      value: "82%",
      icon: <FiTrendingUp />,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 3,
      title: "Improved Resumes",
      value: "17",
      icon: <FiCheckCircle />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "Last Activity",
      value: "Today",
      icon: <FiClock />,
      color: "from-cyan-500 to-sky-500",
    },
  ];

  const history = [
    {
      id: 1,
      name: "Frontend_Resume.pdf",
      date: "Today, 11:20 AM",
      score: "88%",
      status: "Excellent",
    },
    {
      id: 2,
      name: "MERN_Developer.pdf",
      date: "Yesterday, 6:10 PM",
      score: "79%",
      status: "Good",
    },
    {
      id: 3,
      name: "Software_Engineer.pdf",
      date: "2 Days Ago",
      score: "71%",
      status: "Average",
    },
    {
      id: 4,
      name: "React_Resume.pdf",
      date: "4 Days Ago",
      score: "91%",
      status: "Top Rated",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome Back, {user?.name} 👋</h1>
        <p className="text-gray-400 mt-2">
          Track your resume performance & AI analysis history.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map((item) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={item.id}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-xl mb-4`}
            >
              {item.icon}
            </div>

            <h2 className="text-gray-400 text-sm">{item.title}</h2>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Resume History */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Recent Analysis History</h2>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {history.map((item) => (
            <motion.div
              whileHover={{ scale: 1.01 }}
              key={item.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-white/10 rounded-xl p-4 bg-white/5"
            >
              {/* Left */}
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.date}</p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-purple-400">
                  {item.score}
                </span>

                <span className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10 text-gray-300">
                  {item.status}
                </span>

                <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition">
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Db;