"use strict";

const http = require("node:http");

const app = require("./app");
const db = require("../db/instance");

const PORT = process.env.PORT || 3000;

db.raw("SELECT 1+1 AS result").asCallback((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Database connection successful");

  const server = http.createServer(app);

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
