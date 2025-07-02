"use strict";

const express = require("express");
const { scopePerRequest } = require("awilix-express");
const cookieParser = require("cookie-parser");
const logger = require("pino-http");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");

const config = require("./config");
const getContainer = require("./ioc-container");

const cors = require("./middleware/cors");
const timer = require("./middleware/timer");
const notFoundHandler = require("./middleware/not-found");
const { errorHandler, errorConverter } = require("./middleware/error");

const rentalRoutes = require("./routes/rental");
const tenantRoutes = require("./routes/tenant");
const authRoutes = require("./routes/auth");

// TODO: add unit tests for the app module
const app = express();

// TODO: remove NODE_ENV
if (config.sererLogging === "true") {
  app.use(logger());
}
app.use(timer);

// new scope for each request!
app.use(scopePerRequest(getContainer()));

// parsing
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// security
app.use(xss());
app.use(helmet());
app.use(cors());

// routes
app.use("/rentals", rentalRoutes);
app.use("/tenants", tenantRoutes);
app.use("/auth", authRoutes);

// error handlers
app.use(notFoundHandler);
app.use(errorConverter);
app.use(errorHandler);

if (require.main === module) {
  const PORT = config.port || 3000;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;
