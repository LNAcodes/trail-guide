import { type Response, type Request } from "express";
import { getAllRegions, getRegionBySlug } from "../models/regionModel";
import { getTrailsByRegionId } from "../models/trailModel";

export async function getApiRegions(_req: Request, res: Response) {
  const regions = await getAllRegions();
  // console.log(regions);
  res.status(200).json({ regions });
}

export async function getApiTrailsByRegionId(
  req: Request<{ slug: string }>,
  res: Response,
) {
  const slug = req.params.slug;
  const region = await getRegionBySlug(slug);
  if (!region) {
    res.status(404).json({ error: "Region not found" });
    return;
  }
  const trails = await getTrailsByRegionId(region.id!);
  res.status(200).json({ trails });
}
