import { type Request, type Response } from "express";
import {
  getAllTrails,
  getTrailBySlug,
  getTrailsByRegionId,
} from "../models/trailModel";

export async function listTrails(req: Request, res: Response) {
  const trails = await getAllTrails();
  res.render("trails", { trails });
}

export async function showTrail(req: Request<{ slug: string }>, res: Response) {
  const slug = req.params.slug;
  const trail = await getTrailBySlug(slug);
  if (!trail) {
    res.status(404).send("Trail not found");
    return;
  }

  res.render("trail", { trail });
}
