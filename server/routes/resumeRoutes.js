import express from "express";
import { deleteResume, getMyResume, getSingleResume, updateResumeAnalysis, uploadResume } from "../contollers/resumeController.js";
                                                                                                                                                                                                                                                                                            

const router = express.Router();

router.post("/upload", uploadResume);
router.get("/my-resumes", getMyResume);
router.get("/:id", getSingleResume);
router.delete("/:id", deleteResume);
router.put("/analyze/:id", updateResumeAnalysis);

export default router;