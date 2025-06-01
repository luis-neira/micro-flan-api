"use strict";

require("dotenv").config();

const debug = require("debug")("http");
const awilixContainer = require("./ioc-container");
const app = require("./app");
const initServer = require("./server");

const db = awilixContainer.resolve("db");

db.raw("SELECT 1+1 AS result").asCallback((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const { client } = db.client.config;

  debug("Database client " + client + " connected");

  initServer(app);
});
