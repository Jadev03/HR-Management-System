import { before, after, describe, it } from "node:test";
import assert from "node:assert/strict";
import dotenv from "dotenv";
import mysql from "mysql2";
import request from "supertest";

import { createApp } from "../../src/app.js";

dotenv.config();

const shouldRun = process.env.RUN_INTEGRATION_TESTS === "true";
const runDescribe = shouldRun ? describe : describe.skip;

let db;
let app;

runDescribe("Integration API tests (real DB)", () => {
  before((t, done) => {
    db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    db.connect((error) => {
      if (error) {
        done(error);
        return;
      }

      app = createApp(db);
      done();
    });
  });

  after((done) => {
    if (!db) {
      done();
      return;
    }

    db.end(done);
  });

  it("GET / should return welcome message", async () => {
    const response = await request(app).get("/");
    assert.equal(response.status, 200);
    assert.equal(response.body, "Welcome to Jupiter Apparels");
  });

  it("GET /department should return data array", async () => {
    const response = await request(app).get("/department");
    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
  });

  it("POST /login should authenticate seeded admin user", async () => {
    const response = await request(app).post("/login").send({
      User_ID: process.env.TEST_LOGIN_USER_ID || "U000001",
      Password: process.env.TEST_LOGIN_PASSWORD || "admin123",
    });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "Success");
    assert.ok(response.body.role);
  });
});
