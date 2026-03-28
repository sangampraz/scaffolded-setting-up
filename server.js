const http = require("http");
const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");

const PORT = process.env.PORT || 3000;

function send(res, statusCode, body, contentType = "text/html; charset=utf-8") {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
}

function readFileSafe(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

const server = http.createServer((req, res) => {
  const method = req.method || "GET";
  const url = req.url || "/";

  // Serve the form
  if (method === "GET" && url === "/") {
    const filePath = path.join(__dirname, "public", "index.html");
    try {
      const html = readFileSafe(filePath);
      return send(res, 200, html);
    } catch (err) {
      return send(res, 500, "<h1>500</h1><p>Could not load index.html</p>");
    }
  }

  // Handle form submission
  if (method === "POST" && url === "/submit") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString("utf8");
      // simple safety limit (1MB)
      if (body.length > 1_000_000) req.destroy();
    });

    req.on("end", () => {
      const params = new URLSearchParams(body);
      const name = (params.get("name") || "").trim();

      const safeName = name
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

      return send(
        res,
        200,
        `<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8"><title>Submitted</title></head>
  <body>
    <h1>Thanks!</h1>
    <p>You submitted: <strong>${safeName || "(empty)"}</strong></p>
    <p><a href="/">Back</a></p>
  </body>
</html>`
      );
    });

    return;
  }

  // Everything else
  send(res, 404, "<h1>404</h1><p>Not found</p>");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});