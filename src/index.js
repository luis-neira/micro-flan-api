"use strict";

const debug = require("debug")("http");

const config = require("./config");
const { buildContainer } = require("./ioc-container");
const buildExpressApp = require("./app");
const initServer = require("./server");

let server;
let container;

process.on("uncaughtException", (err) => handleUnexpectedError(err, "uncaughtException"));
process.on("unhandledRejection", (err) => handleUnexpectedError(err, "unhandledRejection"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGUSR2", () => gracefulShutdown("SIGUSR2")); // nodemon

bootstrapApp();

async function bootstrapApp() {
  try {
    debug("Bootstrapping application...");

    // Setup DI container
    container = buildContainer(config);
    
    // Test DB connection
    const db = container.resolve("db");
    await db.raw("SELECT 1+1 AS result");
    debug("Database connected:", db.client.config.client);

    // Initialize Express app and HTTP server
    const app = buildExpressApp(config);
    server = initServer(app, config);

    debug("Application is up and running");
  } catch (error) {
    console.error("Bootstrap error:", error);
    await shutdown(1);
  }
}

function gracefulShutdown(signal) {
  debug(`Received ${signal}. Gracefully shutting down...`);
  shutdown(0);
}

function handleUnexpectedError(error, source) {
  console.error(`Unexpected error from ${source}:`, error);
  shutdown(1);
}

function shutdown(exitCode) {
  if (server) {
    server.close(() => {
      debug("HTTP server closed");

      if (container) {
        container
          .dispose()
          .then(() => {
            debug("DI Container disposed");
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
