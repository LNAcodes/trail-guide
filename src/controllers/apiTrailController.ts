import { type Request, type Response } from "express";
import { getTrailById, deleteTrail } from "../models/trailModel";

export async function getAllApiTrails(_req: Request, res: Response) {
  // lies optionale Query-Parameter region und difficulty aus req.query
  // hole alle Trails aus der Datenbank
  // WENN region angegeben:
  // filtere die Trails, sodass nur die mit passendem region_name übrig bleiben
  // WENN difficulty angegeben:
  // filtere zusätzlich nach difficulty
  // sende die (gefilterte) Liste als JSON zurück, Status 200
}

export async function getApiTrailBySlug(_req: Request, res: Response) {
  // hole slug aus req.params
  // hole den Trail per Slug
  // WENN nicht gefunden:
  // 404 mit JSON-Fehlermeldung
  // sende den Trail als JSON zurück, Status 200
}

export async function createApiTrail(_req: Request, res: Response) {
  //   lies die Felder aus req.body (JSON-Body diesmal, nicht Formular)
  // prüfe: sind alle Pflichtfelder vorhanden? (title, region_id, difficulty, distance_km)
  // WENN nicht:
  //   400 mit JSON-Fehlermeldung
  // lege den Trail an (addTrail)
  // hole den neu angelegten, vollständigen Trail nochmal (mit JOIN, für die Antwort)
  // sende ihn als JSON zurück, Status 201
}

export async function updateApiTrail(_req: Request, res: Response) {
  //   hole id aus req.params
  // prüfe: existiert überhaupt ein Trail mit dieser id?
  // WENN nicht:
  //   404 mit JSON-Fehlermeldung
  // aktualisiere den Trail mit den Feldern aus req.body
  // hole den aktualisierten Trail nochmal
  // sende ihn als JSON zurück, Status 200
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
