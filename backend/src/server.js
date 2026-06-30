import dotenv from "dotenv";
import { createDbConnection } from "./config/db.js";
import { createApp } from "./app.js";

dotenv.config();

const db = createDbConnection();
const app = createApp(db);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log("Backend server is running!!");
});
