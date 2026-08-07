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
  return await db.all<Trail[]>(
    "SELECT trails.*, regions.name AS region_name, regions.country AS region_country FROM trails INNER JOIN regions ON trails.region_id = regions.id",
  );
}

export async function getTrailBySlug(slug: string): Promise<Trail | undefined> {
  const db = getDB();
  return await db.get<Trail>(
    "SELECT trails.*, regions.name AS region_name, regions.country AS region_country FROM trails INNER JOIN regions ON trails.region_id = regions.id WHERE trails.slug = ? ",
    slug,
  );
}

export async function getTrailsByRegionId(
  region_id: number,
): Promise<Trail[] | undefined> {
  const db = getDB();
  return await db.all<Trail[]>(
    "SELECT trails.*, regions.name AS region_name, regions.country AS region_country FROM trails INNER JOIN regions ON trails.region_id = regions.id WHERE trails.region_id = ? ",
    region_id,
  );
}
