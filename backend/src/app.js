import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import jobPaygradeRoutes from "./routes/jobPaygradeRoutes.js";
import reportAndCustomRoutes from "./routes/reportAndCustomRoutes.js";

function parseAllowedOrigins(value) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function createCorsOptions(allowedOrigins) {
  if (allowedOrigins.length === 0) {
    return {};
  }

  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
  };
}

export function createApp(db, options = {}) {
  const app = express();
  const allowedOrigins = options.allowedOrigins ?? parseAllowedOrigins(process.env.CORS_ALLOWED_ORIGINS);

  app.use(express.json());
  app.use(cors(createCorsOptions(allowedOrigins)));

  app.use(authRoutes(db));
  app.use(departmentRoutes(db));
  app.use(employeeRoutes(db));
  app.use(leaveRoutes(db));
  app.use(jobPaygradeRoutes(db));
  app.use(reportAndCustomRoutes(db));

  return app;
}
