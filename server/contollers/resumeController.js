import cloudinary from "../config/cloudinary.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// Upload Resume
export const uploadResume = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "raw",
      folder: "resumes",
    });

    const resume = await Resume.create({
      user: req.user._id,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      fileName: file.originalname,
      fileUrl: result.secure_url,
      fileType: file.mimetype.includes("pdf") ? "pdf" : "docx",
      fileSize: file.size,
      skills: req.body.skills ? req.body.skills.split(",") : [],
      experience: req.body.experience || 0,
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
    });

    fs.unlinkSync(file.path);

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully.",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Resumes
export const getMyResume = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Resume
export const getSingleResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      res.status(404).json({
        success: false,
        message: "resume not found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      res.status(500).json({
        success: false,
        message: "resume not found",
      });
    }

    await Resume.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Resume Deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Update ATS resume/analays
export const updateResumeAnalysis = async (req, res) => {
  try {
    const { atsScore, matchedKeywords, missingKeywords, suggestions } =
      req.body;

    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      {
        atsScore,
        matchedKeywords,
        missingKeywords,
        suggestions,
        status: "analyzed",
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
