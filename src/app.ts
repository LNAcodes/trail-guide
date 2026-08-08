import express from "express";
import nunjucks from "nunjucks";
import { connectDB, closeDB } from "./models/db";
import websiteRoutes from "./routes/websiteRoutes";
import adminRoutes from "./routes/adminRoutes";
import apiRoutes from "./routes/apiRoutes";
import { logger, ensureLogFile } from "./middleware/logger";

const app = express();
const port = Number(process.env.PORT) || 3000;
app.set("view engine", "njk");

app.use(express.urlencoded({ extended: true }));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

//mounted in without prefix
app.use(express.static("public"));
//alternative:
// app.use("/public", express.static("public"));
// useful way when more than one static file e.g. + /uploads

app.use(logger);
app.use("/", websiteRoutes);
app.use(adminRoutes);
app.use(apiRoutes);

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();

// both are handler functions that say "server get ready zu be closed, but first disconnect the db properly"
process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing database connection...");
  await closeDB();
  process.exit(0);
});
