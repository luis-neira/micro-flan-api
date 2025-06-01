"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("pino-http");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");

const awilixContainer = require("./ioc-container");

const cors = require("./middleware/cors");
const timer = require("./middleware/timer");
const handleResourceNotFound = require("./middleware/not-found");
const handleDefaultError = require("./middleware/error");

const rentalRoutes = require("./routes/rental");
const tenantRoutes = require("./routes/tenant");
const authRoutes = require("./routes/auth");

// TODO: add unit tests for the app module
const app = express();

if (process.env.NODE_ENV !== "test") {
  app.use(logger());
}
app.use(timer);

// new scope for each request!
app.use((req, res, next) => {
  req.container = awilixContainer.createScope();
  return next();
});

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
app.use(handleResourceNotFound);
app.use(handleDefaultError);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;
