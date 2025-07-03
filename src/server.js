"use strict";

const http = require("node:http");
const debug = require("debug")("http");

let server = null;

function initServer(app, config) {
  server = http.createServer(app);

  server.listen(config.port, "0.0.0.0");
  server.on("error", onError);
  server.on("listening", onListening);

  return server;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const addr = server.address();

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error("Port " + addr.port + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("Port " + addr.port + " is already in use");
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
