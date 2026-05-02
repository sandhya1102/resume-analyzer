import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["pdf", "doc", "docx"],
      required: true,
    },

    fileSize: {
      type: Number,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    experience: {
      type: Number, // years
      default: 0,
    },

    education: [
      {
        degree: String,
        college: String,
        year: String,
      },
    ],

    atsScore: {
      type: Number,
      default: 0,
    },

    matchedKeywords: [
      {
        type: String,
      },
    ],

    missingKeywords: [
      {
        type: String,
      },
    ],

    suggestions: [
      {
        type: String,
      },
    ],

    grammarScore: {
      type: Number,
      default: 0,
    },

    formattingScore: {
      type: Number,
      default: 0,
    },

    jobTitle: {
      type: String,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "analyzed", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;