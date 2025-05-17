"use strict";

const express = require("express");

const createTenantController = require("../controllers/tenant");
const TenantRepo = require("../repos/tenant");
const db = require("../db/instance");

const router = express.Router();
const tenantRepo = new TenantRepo(db);
const tenantController = createTenantController(tenantRepo);

router.route("/").get(tenantController.getTenants);

module.exports = router;
