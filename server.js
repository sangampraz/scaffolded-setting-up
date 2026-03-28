const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

/*
 * Middleware: parse application/x-www-form-urlencoded
 * This replaces our manual req.on("data") logic from Phase 1
 */
app.use(express.urlencoded({ extended: false }));

/*
 * GET /
 * Serve the HTML form
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/*
 * POST /submit
 * Handle form submission
 */
app.post("/submit", (req, res) => {
  const name = (req.body.name || "").trim();
  const age = (req.body.age || "").toString().trim();

  const safeName = name
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  const safeAge = age
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  

  res.send(`<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8"><title>Submitted</title></head>
  <body>
    <h1>Thanks!</h1>
    <p>You submitted: ${safeName || "(empty)"} ${safeAge || "(empty)"}</p> 
    <p><a href="/">Back</a></p>
  </body>
</html>`);
});

/*
 * Start server
 */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});