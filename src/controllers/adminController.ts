import { type Request, type Response } from "express";
import { getAllTrails, getTrailBySlug } from "../models/trailModel";
import { getAllRegions } from "../models/regionModel";
import sanitizeHTML from "sanitize-html";

export async function listAdminTrails(_req: Request, res: Response) {
  const trails = await getAllTrails();
  res.render("admin", { trails });
}
