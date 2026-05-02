import multer from "multer";
import { uploadResume } from "../contollers/resumeController.js";
import { analayzResume } from "../contollers/analysContoller.js";

const upload = multer({dest:"uploads/"});

router.post("/upload", upload.single("resume"),uploadResume);
router.post("/analyze", upload.single("resume"), analayzResume);