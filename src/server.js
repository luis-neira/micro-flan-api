"use strict";

const http = require("node:http");
const debug = require("debug")("http");

const PORT = process.env.PORT || 3000;

let server = null;

function initServer(app) {
  server = http.createServer(app);

  server.listen(PORT, "0.0.0.0");
  server.on("error", onError);
  server.on("listening", onListening);
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error("Port " + PORT + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("Port " + PORT + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  debug("Server listening on port " + addr.port);
}

module.exports = initServer;
