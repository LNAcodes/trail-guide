import express from "express";
import nunjucks from "nunjucks";

const app = express();
const port = Number(process.env.PORT) || 3000;
app.set("view engine", "njk");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", (req, res) => {
  res.render("_base.njk", { title: "Home" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
