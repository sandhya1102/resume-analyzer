import express from "express";
import { analyze } from "../contollers/analysContoller.js";


const router = express.Router();

router.post("/analys",analyze)

export default router;