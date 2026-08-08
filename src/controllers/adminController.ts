import { type Request, type Response } from "express";
import {
  getAllTrails,
  getTrailBySlug,
  getTrailsByRegionId,
  getTrailById,
  addTrail,
  updateTrail,
  deleteTrail,
} from "../models/trailModel";
import { getAllRegions } from "../models/regionModel";
import sanitizeHTML from "sanitize-html";

export async function handleListAdminTrails(_req: Request, res: Response) {
  const trails = await getAllTrails();
  res.render("admin/list", { trails });
}

export async function handleShowNewTrail(_req: Request, res: Response) {
  const regions = await getAllRegions();
  res.render("admin/form", { regions });
}

export async function handleCreateTrail(req: Request, res: Response) {
  // console.log("BODY:", req.body);
  const newTrail = {
    region_id: Number(req.body.region_id),
    title: req.body.title,
    difficulty: req.body.difficulty,
    distance_km: Number(req.body.distance_km),
    description: sanitizeHTML(req.body.description, {
      allowedTags: ["p", "h1", "h2", "h3", "a", "ul", "ol", "li", "img"],
      allowedAttributes: {
        a: ["href"],
        img: ["src", "alt"],
      },
    }),
    image_url: req.body.image_url,
  };
  await addTrail(newTrail);
  res.redirect("/admin");
}

export async function handleShowEditTrail(
  req: Request<{ id: string }>,
  res: Response,
) {
  const id = Number(req.params.id);
  const trail = await getTrailById(id);

  if (!trail) {
    res.status(404).send("Trail not found");
    return;
  }
  const regions = await getAllRegions();
  res.render("admin/form", { regions, trail });
}

export async function handleUpdateTrail(
  req: Request<{ id: string }>,
  res: Response,
) {
  const id = Number(req.params.id);

  const updatedTrail = {
    region_id: Number(req.body.region_id),
    title: req.body.title,
    difficulty: req.body.difficulty,
    distance_km: Number(req.body.distance_km),
    description: sanitizeHTML(req.body.description, {
      allowedTags: ["p", "h1", "h2", "h3", "a", "ul", "ol", "li", "img"],
      allowedAttributes: {
        a: ["href"],
        img: ["src", "alt"],
      },
    }),
    image_url: req.body.image_url,
  };
  await updateTrail(id, updatedTrail);
  res.redirect("/admin");
}

export async function handleDeleteTrail(
  req: Request<{ id: string }>,
  res: Response,
) {
  const id = Number(req.params.id);
  await deleteTrail(id);
  res.redirect("/admin");
}
