import { describe, it } from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcrypt";
import request from "supertest";

import { createApp } from "../../src/app.js";
import { createMockDb } from "../helpers/mockDb.js";

describe("Functional API tests (mocked DB)", () => {
  it("GET / should return welcome message", async () => {
    const db = createMockDb((sql, params, cb) => cb(null, []));
    const app = createApp(db);

    const response = await request(app).get("/");

    assert.equal(response.status, 200);
    assert.equal(response.body, "Welcome to Jupiter Apparels");
  });

  it("POST /login should return success for valid credentials", async () => {
    const hashedPassword = await bcrypt.hash("pass123", 10);
    const db = createMockDb((sql, params, cb) => {
      if (sql.includes("SELECT * FROM user")) {
        cb(null, [
          {
            User_ID: "U999001",
            Password: hashedPassword,
            Access_level: "Admin",
            Employee_ID: "E999001",
          },
        ]);
        return;
      }
      cb(null, []);
    });
    const app = createApp(db);

    const response = await request(app).post("/login").send({
      User_ID: "U999001",
      Password: "pass123",
    });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "Success");
    assert.equal(response.body.role, "Admin");
    assert.equal(response.body.EMP_id, "E999001");
  });

  it("POST /login should return invalid for wrong password", async () => {
    const hashedPassword = await bcrypt.hash("pass123", 10);
    const db = createMockDb((sql, params, cb) => {
      if (sql.includes("SELECT * FROM user")) {
        cb(null, [
          {
            User_ID: "U999001",
            Password: hashedPassword,
            Access_level: "Admin",
            Employee_ID: "E999001",
          },
        ]);
        return;
      }
      cb(null, []);
    });
    const app = createApp(db);

    const response = await request(app).post("/login").send({
      User_ID: "U999001",
      Password: "wrong-pass",
    });

    assert.equal(response.status, 200);
    assert.equal(response.body, "Invalid");
  });

  it("GET /department should return rows from database", async () => {
    const db = createMockDb((sql, params, cb) => {
      if (sql.includes("SELECT * FROM department")) {
        cb(null, [{ Dept_ID: "SL001D1", Dept_Name: "Administration Department" }]);
        return;
      }
      cb(null, []);
    });
    const app = createApp(db);

    const response = await request(app).get("/department");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
    assert.equal(response.body[0].Dept_ID, "SL001D1");
  });
});
