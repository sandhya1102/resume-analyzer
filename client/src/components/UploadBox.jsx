import React from "react";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";
import resumeImg from "../assets/img.png"

const UploadBox = () => {
  return (
    <div className="min-h-[100vh] flex items-center justify-center px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Is Your Resume{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Good Enough?
            </span>
          </h1>

          <p className="text-gray-400 mb-8">
            Upload your resume and get an instant ATS score, keyword analysis,
            and AI-powered suggestions to land your dream job 🚀
          </p>

          {/* UPLOAD BOX */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center cursor-pointer hover:border-purple-400 transition backdrop-blur-lg bg-white/5"
          >
            <FiUploadCloud size={40} className="mx-auto mb-4 text-purple-400" />
            <p className="text-lg font-semibold">
              Drag & Drop your Resume here
            </p>
            <p className="text-sm text-gray-400 mt-2">PDF or DOCX (Max 5MB)</p>

            <button className="mt-5 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold shadow-md hover:opacity-90">
              Upload Resume
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE (PREVIEW CARD) */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex justify-center"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-30 rounded-2xl"></div>

            {/* Image */}
            <img
              src={resumeImg}
              alt="Resume Preview"
              className="relative w-[420px] rounded-2xl shadow-2xl border border-white/20"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadBox;
