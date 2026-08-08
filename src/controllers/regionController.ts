import { type Request, type Response } from "express";

import { getAllRegions, getRegionBySlug } from "../models/regionModel";
import { getTrailsByRegionId } from "../models/trailModel";

export async function listRegions(req: Request, res: Response) {
  const regions = await getAllRegions();
  res.render("regions", { regions });
}

export async function showRegion(
  req: Request<{ slug: string }>,
  res: Response,
) {
  const slug = req.params.slug;
  const region = await getRegionBySlug(slug);
  if (!region) {
    res.status(404).send("Region not found");
    return;
  }
  const trails = await getTrailsByRegionId(region.id!);
  res.render("region", { region, trails });
}
