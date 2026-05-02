import express from "express";
import { analyzeResumeFile } from "../contollers/analysContoller.js";


const router = express.Router()

router.get("/analyze",analyzeResumeFile);

export default router;