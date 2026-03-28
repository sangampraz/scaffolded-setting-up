// smoke.js

const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Phase-0 smoke test OK\n");
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Listening on http://0.0.0.0:3000");
});
