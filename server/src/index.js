import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import aiNewsRoutes from "./routes/aiNewsRoutes.js";

dotenv.config();

// Fail fast if JWT_SECRET is missing (beginner-friendly safety check)
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing. Add it in server/.env");
}

const app = express();

// Connect to MongoDB
await connectDB();

// CORS configuration to allow requests from the frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://briefly-ai-flame.vercel.app",
];

// Allow cookies from the frontend (Vite default: 5173)
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());

// Required to read cookies
app.use(cookieParser());

// Basic health check
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/news", aiNewsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
