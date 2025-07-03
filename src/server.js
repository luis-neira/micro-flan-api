"use strict";

const http = require("node:http");
const debug = require("debug")("http");

const config = require("./config");
const getContainer = require("./ioc-container");

const awilixContainer = getContainer();

let server = null;

function initServer(app) {
  server = http.createServer(app);

  server.listen(config.port, "0.0.0.0");
  server.on("error", onError);
  server.on("listening", onListening);

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
  process.on("SIGUSR2", gracefulShutdown); // Sent by nodemon
}

function gracefulShutdown() {
  if (server) {
    server.close(() => {
      debug("Server closed");
      awilixContainer
        .dispose()
        .then(() => {
          debug("DI-Container has been disposed");
          process.exit();
        })
        .catch((err) => {
          console.error(err);
          process.exit(1);
        });
    });
  } else {
    process.exit(1);
  }
}

function unexpectedErrorHandler(error) {
  console.log(error);
  exitHandler();
}

function exitHandler() {
  if (server) {
    server.close(() => {
      debug("Server closed");
      awilixContainer
        .dispose()
        .then(() => {
          debug("DI-Container has been disposed");
        })
        .catch(console.error)
        .finally(() => {
          process.exit(1);
        });
    });
  } else {
    process.exit(1);
  }
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
      console.error("Port " + config.port + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error("Port " + config.port + " is already in use");
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
