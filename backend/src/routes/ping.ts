import { Router } from "express";
import { isFeatureEnabled } from "../feature-flags";

/**
 * GET /api/ping, gated by the issue-146 feature flag. The flag is checked
 * once here, at the route's single entry point. While it is off (the default
 * until the Orchestrator releases it) the route does not exist, so it answers
 * 404 like any other unknown path. Only GET is registered: other methods fall
 * through to the app's default 404.
 */
export const pingRouter = Router();

pingRouter.get("/api/ping", async (_req, res) => {
  if (!(await isFeatureEnabled(res, "issue-146"))) {
    res.status(404).end();
    return;
  }
  res.json({ pong: true });
});
