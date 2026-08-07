import { Router } from "express";
import {
  handleListAdminTrails,
  handleShowNewTrail,
  handleCreateTrail,
  handleShowEditTrail,
  handleUpdateTrail,
  handleDeleteTrail,
} from "../controllers/adminController";

const router = Router();

router.get("/admin", handleListAdminTrails);
router.get("/admin/trails/new", handleShowNewTrail);
router.get("/admin/trails/:id/edit", handleShowEditTrail);
router.post("/admin/trails", handleCreateTrail);
router.post("/admin/trails/:id", handleUpdateTrail);
router.post("/admin/trails/:id/delete", handleDeleteTrail);

export default router;
