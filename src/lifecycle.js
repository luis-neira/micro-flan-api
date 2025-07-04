"use strict";

// const debug = require("debug")("lifecycle");

let serverRef = null;
let containerRef = null;

function registerLifecycleHandlers({ getServer, getContainer }) {
  serverRef = getServer;
  containerRef = getContainer;

  process.on("uncaughtException", (err) => handleUnexpectedError(err, "uncaughtException"));
  process.on("unhandledRejection", (err) => handleUnexpectedError(err, "unhandledRejection"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGUSR2", () => gracefulShutdown("SIGUSR2")); // nodemon
}

function gracefulShutdown(signal) {
  console.log(`Received ${signal}. Gracefully shutting down...`);
  shutdown(0);
}

function handleUnexpectedError(error, source) {
  console.error(`Unexpected error from ${source}:`, error);
  shutdown(1);
}

function shutdown(exitCode) {
  const server = typeof serverRef === "function" ? serverRef() : serverRef;
  const container = typeof containerRef === "function" ? containerRef() : containerRef;

  if (server) {
    server.close(() => {
      console.log("HTTP server closed");

      if (container) {
        container
          .dispose()
          .then(() => {
            console.log("DI Container disposed");
            console.log("Service shutdown");
          })
          .catch((err) => {
            console.error("Error during shutdown:", err);
          })
          .finally(() => {
            process.exit(exitCode);
          })
      }

    })
  } else {
    process.exit(exitCode);
  }
}

module.exports = {
  registerLifecycleHandlers,
};
