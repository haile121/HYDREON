import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import apiRouter from "./routes/api.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Healthcheck
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "HYDREON StreamGuard AI Backend",
    timestamp: new Date().toISOString(),
    aiProvider: process.env.AI_PROVIDER || "mock",
  });
});

// API Routes
app.use("/api", apiRouter);

// Global Error Handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("🔥 Server Error:", err);
    res.status(err.status || 500).json({
      success: false,
      error: err.message || "Internal Server Error",
    });
  },
);

if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 HYDREON REST API running on http://localhost:${PORT}`);
  });
}

export default app;
