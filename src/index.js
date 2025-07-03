"use strict";

const debug = require("debug")("http");

const getContainer = require("./ioc-container");
const app = require("./app");
const initServer = require("./server");

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("SIGUSR2", gracefulShutdown); // Sent by nodemon

let server;

const awilixContainer = getContainer();
const db = awilixContainer.resolve("db");
const config = awilixContainer.resolve("config");

db.raw("SELECT 1+1 AS result").asCallback((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const { client } = db.client.config;

  debug("Database client " + client + " connected");

  server = initServer(app, config);
});

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
