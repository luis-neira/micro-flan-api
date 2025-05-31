"use strict";

const express = require("express");
const awilixExpress = require("awilix-express");
const makeTenantAPI = require("../controllers/tenant");

const { makeFunctionInvoker } = awilixExpress;

const router = express.Router();
const api = makeFunctionInvoker(makeTenantAPI);

router.route("/").get(api("getTenants"));

module.exports = router;
