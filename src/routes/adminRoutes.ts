import { Router } from "express";
import {
  listAdminTrails,
  showNewTrail,
  showEditTrail,
  createTrail,
  updateTrail,
  deleteTrail,
} from "../controllers/adminController";

const router = Router();

router.get("/admin", listAdminTrails);
router.get("/admin/trails/new", showNewTrail);
router.get("/admin/trails/:id/edit", showEditTrail);
router.post("/admin/trails", createTrail);
router.post("/admin/trails/:id", updateTrail);
router.post("/admin/trails/:id/delete", deleteTrail);

export default router;
