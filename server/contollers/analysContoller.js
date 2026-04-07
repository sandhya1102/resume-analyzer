import { analyzeResume } from "../services/aiService.js";

export const analyze = async (req, res) => {
  try {
    const { resumeText, jobDesc } = req.body;

    const result = await analyzeResume(resumeText, jobDesc);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};