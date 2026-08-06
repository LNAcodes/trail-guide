import { getDB } from "./db";

export interface Trail {
  id?: number;
  region_id: number;
  title: string;
  slug: string;
  difficulty: string;
  distance_km: number;
  description: string;
  image_url: string;
  created_at: number;
  region_name: string;
  region_country: string;
}

export async function getAllTrails(): Promise<Trail[]> {
  const db = getDB();
  /* return await db.all<Trail[]>("SELECT
  trails.id, trails.region_id, trails.title, trails.slug,
  trails.difficulty, trails.distance_km, trails.description,
  trails.image_url, trails.created_at,
  regions.name AS region_name,
  regions.country AS region_country" FROM trails
INNER JOIN regions ON trails.region_id = regions.id,);
}
instead of listing every column from trails > "shortcut" trails.*, and no collison with id (in both interfaces), because we don't call id, only name and country
  */
  return await db.all<Trail[]>(
    "SELECT trails.*, regions.name AS region_name, regions.country AS region_country FROM trails INNER JOIN regions ON trails.region_id = regions.id",
  );
}

export async function getTrailBySlug(slug: string): Promise<Trail | undefined> {
  const db = getDB();
  return await db.get<Trail>(
    "SELECT trails.*, regions.name AS region_name, regions.country AS region_country FROM trails INNER JOIN regions ON trails.region_id = regions.id WHERE slug = ? ",
    slug,
  );
}
