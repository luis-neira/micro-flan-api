"use strict";

class TenantRepo {
  constructor(db) {
    this.db = db;
  }

  getTenants() {
    return this.db.select().from("tenants");
  }
}

module.exports = TenantRepo;
