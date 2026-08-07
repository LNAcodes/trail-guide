import { type Request, type Response } from "express";
import { getAllTrails, getTrailBySlug } from "../models/trailModel";
import { getAllRegions } from "../models/regionModel";
import sanitizeHTML from "sanitize-html";

export async function listAdminTrails(_req: Request, res: Response) {
  const trails = await getAllTrails();
  res.render("admin", { trails });
}

export async function showNewTrail(_req: Request, res: Response) {
  const regions = await getAllRegions();
  res.render("admin/form", { regions });
}

export async function createTrail(req: Request, res: Response) {
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
