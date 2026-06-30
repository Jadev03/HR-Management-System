import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import jobPaygradeRoutes from "./routes/jobPaygradeRoutes.js";
import reportAndCustomRoutes from "./routes/reportAndCustomRoutes.js";

export function createApp(db) {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(authRoutes(db));
  app.use(departmentRoutes(db));
  app.use(employeeRoutes(db));
  app.use(leaveRoutes(db));
  app.use(jobPaygradeRoutes(db));
  app.use(reportAndCustomRoutes(db));

  return app;
}
