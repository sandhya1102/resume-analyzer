import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";
import resumeImg from "../assets/img.png";
import { toast } from "react-toastify";
import axios from "axios";
import { RESUME_API } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { analyzeResume } from "../redux/resumeSlice.js"; 

const UploadBox = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  // ✅ Redux state
  const { result, loading, error } = useSelector(
    (state) => state.resume
  );

  // 📁 FILE SELECT
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (
      selectedFile.type !== "application/pdf" &&
      selectedFile.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      toast.error("Only PDF or DOCX allowed");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File must be less than 5MB");
      return;
    }

    setFile(selectedFile);
  };

  // 🚀 UPLOAD
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await axios.post(
        `${RESUME_API}/upload`, 
        formData,
        { withCredentials: true }
      );

      console.log("Uploaded:", data);
      toast.success("Resume uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Upload Failed ❌");
    }
  };

  // 🧠 ANALYZE
  const handleAnalyze = () => {
    if (!file) {
      toast.error("Upload file first");
      return;
    }

    dispatch(analyzeResume(file));
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Is Your Resume{" "}
            <span className="bg-gradient-to-r from-sky-400 to-green-500 text-transparent bg-clip-text">
              Good Enough?
            </span>
          </h1>

          <p className="text-gray-400 mb-8">
            Upload your resume and get ATS score & AI suggestions 🚀
          </p>

          {/* UPLOAD BOX */}
          <motion.div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center">

            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="resumeUpload"
            />

            <label htmlFor="resumeUpload" className="cursor-pointer">
              <FiUploadCloud size={40} className="mx-auto mb-4 text-sky-400" />

              <p className="text-lg font-semibold">
                {file ? file.name : "Click to Upload Resume"}
              </p>
            </label>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-5 justify-center">
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 rounded"
              >
                Upload
              </button>

              <button
                onClick={handleAnalyze}
                className="px-4 py-2 bg-green-500 rounded"
              >
                Analyze
              </button>
            </div>
          </motion.div>

          {/* 🔄 STATES */}
          {loading && <p className="mt-4">Analyzing... ⏳</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}

          {/* 📊 RESULT */}
          {result && (
            <div className="mt-6 p-5 bg-white/5 rounded-xl">
              <h2 className="text-xl font-bold mb-3">Score: {result.score}</h2>

              <h3>Keywords:</h3>
              {result.keywords.map((k, i) => (
                <p key={i}>• {k}</p>
              ))}

              <h3 className="mt-3">Suggestions:</h3>
              {result.suggestions.map((s, i) => (
                <p key={i}>• {s}</p>
              ))}
            </div>
          )}
        </motion.div>

        {/* RIGHT */}
        <motion.div className="hidden md:flex justify-center">
          <img
            src={resumeImg}
            alt="Resume"
            className="w-[420px] rounded-2xl"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default UploadBox;