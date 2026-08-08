import { type Request, type Response } from "express";
import {
  getTrailById,
  deleteTrail,
  getTrailBySlug,
  getAllTrails,
  addTrail,
  updateTrail,
} from "../models/trailModel";
import sanitizeHTML from "sanitize-html";

export async function getAllApiTrails(req: Request, res: Response) {
  const region = req.query.region;
  const difficulty = req.query.difficulty;

  let trails = await getAllTrails();

  if (region) {
    trails = trails.filter((trail) => trail.region_name === region);
  }
  if (difficulty) {
    trails = trails.filter((trail) => trail.difficulty === difficulty);
  }
  res.status(200).json({ trails });
}

export async function getApiTrailBySlug(
  req: Request<{ slug: string }>,
  res: Response,
) {
  const slug = req.params.slug;
  const trail = await getTrailBySlug(slug);
  if (!trail) {
    res.status(404).json({ error: "Trail not found" });
    return;
  }
  res.status(200).json({ trail });
}

export async function createApiTrail(req: Request, res: Response) {
  if (
    !req.body.title ||
    !req.body.region_id ||
    !req.body.difficulty ||
    !req.body.distance_km
  ) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const newApiTrail = {
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
  const newId = await addTrail(newApiTrail);
  const createdTrail = await getTrailById(newId);
  res.status(201).json({ trail: createdTrail });
}

export async function updateApiTrail(
  req: Request<{ id: string }>,
  res: Response,
) {
  const id = Number(req.params.id);
  const trail = await getTrailById(id);
  if (!trail) {
    res.status(404).json({ error: "Trail not found" });
    return;
  }

  if (
    !req.body.title ||
    !req.body.region_id ||
    !req.body.difficulty ||
    !req.body.distance_km
  ) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const updatedFields = {
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
  await updateTrail(id, updatedFields);
  const updatedTrail = await getTrailById(id);
  res.status(200).json({ trail: updatedTrail });
}

export async function deleteApiTrail(
  req: Request<{ id: string }>,
  res: Response,
) {
  const id = Number(req.params.id);
  const trail = await getTrailById(id);
  console.log(trail);

  if (!trail) {
    res.status(404).json({ error: "Trail not found" });
    return;
  }
  await deleteTrail(id);
  res.status(204).send();
}
