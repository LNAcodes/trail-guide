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
import { apiKey } from "../middleware/apiKey";

const router = Router();

router.get("/api/trails", getAllApiTrails);
router.get("/api/trails/:slug", getApiTrailBySlug);
router.get("/api/regions", getApiRegions);
router.get("/api/regions/:slug/trails", getApiTrailsByRegionId);
router.post("/api/trails", apiKey, createApiTrail);
router.patch("/api/trails/:id", apiKey, updateApiTrail);
router.delete("/api/trails/:id", apiKey, deleteApiTrail);

export default router;
