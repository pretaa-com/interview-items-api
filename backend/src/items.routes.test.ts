import { describe, it, expect, beforeAll } from "vitest";
import express from "express";
import cors from "cors";
import request from "supertest";
import { itemsRouter } from "./routes/items.js";

describe("POST /api/items", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/api/items", itemsRouter);
  });

  it("same structure: 200, body has sameStructure true and items or itmes", async () => {
    const res = await request(app)
      .post("/api/items")
      .send({ a: [1, [1, 1]], b: [2, [2, 2]] })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.sameStructure).toBe(true);
    const list = res.body.items ?? res.body.itmes;
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
  });

  it("different structure: 200, body has sameStructure false, no items", async () => {
    const res = await request(app)
      .post("/api/items")
      .send({ a: [1, [1, 1]], b: [[2, 2], 2] })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.sameStructure).toBe(false);
    expect(res.body.items).toBeUndefined();
    expect(res.body.itmes).toBeUndefined();
  });

  it("invalid body (non-array a): 400", async () => {
    const res = await request(app)
      .post("/api/items")
      .send({ a: "not an array", b: [1, 2] })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.sameStructure).toBe(false);
  });
});
