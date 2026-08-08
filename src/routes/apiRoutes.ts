import { Router } from "express";
import {
  getAllApiTrails,
  getApiTrailBySlug,
  createApiTrail,
  updateApiTrail,
  deleteApiTrail,
} from "../controllers/apiTrailController";
import {
  getApiRegions,
  getApiTrailsByRegionId,
} from "../controllers/apiRegionController";

const router = Router();

router.get("/api/trails", getAllApiTrails);
router.get("/api/trails/:slug", getApiTrailBySlug);
router.get("/api/regions", getApiRegions);
router.get("/api/regions/:slug/trails", getApiTrailsByRegionId);
router.post("/api/trails", createApiTrail);
router.patch("/api/trails/:id", updateApiTrail);
router.delete("/api/trails/:id", deleteApiTrail);

export default router;
