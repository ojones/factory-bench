import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../app";
import { withFlag } from "./with-flag";

describe("GET /api/version", () => {
  it("is not registered while the flag is off", async () => {
    const app = createApp();

    const response = await withFlag("issue-142", false, () => request(app).get("/api/version"));

    expect(response.status).toBe(404);
  });

  it("responds 200 with the version payload while the flag is on", async () => {
    const app = createApp();

    const response = await withFlag("issue-142", true, () => request(app).get("/api/version"));

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ version: "1" });
  });

  it("only responds to GET", async () => {
    const app = createApp();

    const response = await withFlag("issue-142", true, () => request(app).post("/api/version"));

    expect(response.status).toBe(404);
  });
});
