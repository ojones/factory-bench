import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../app";
import { withFlag } from "./with-flag";

describe("GET /api/ping", () => {
  it("is not registered while the flag is off", async () => {
    const app = createApp();

    const response = await withFlag("issue-146", false, () => request(app).get("/api/ping"));

    expect(response.status).toBe(404);
  });

  it("responds 200 with the pong payload while the flag is on", async () => {
    const app = createApp();

    const response = await withFlag("issue-146", true, () => request(app).get("/api/ping"));

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ pong: true });
  });

  it("only responds to GET", async () => {
    const app = createApp();

    const response = await withFlag("issue-146", true, () => request(app).post("/api/ping"));

    expect(response.status).toBe(404);
  });
});
