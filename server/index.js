import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../server/routes/authRoutes.js";
import analysRoutes from "../server/routes/analysRoutes.js";

import connectDb from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
connectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/anaysis", analysRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT} `);
});
