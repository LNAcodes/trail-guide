import { Router } from "express";

const router = Router();

router.get("api/trails", getAllApiTrails);
router.get("/api/trails/:slug", getApiTrailJoinedRegion);
router.get("/api/regions", getApiRegions);
router.get("/api/regions/:slug/trails ", getApiTrailsOneRegion);
router.post("/api/trails", createApiTrailJson);
router.patch("/api/trails/:id", updateApiTrailField);
router.delete("/api/trails/:id", deleteApiTrail);

export default router;
