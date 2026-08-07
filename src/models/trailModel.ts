import { slugify } from "../utils/slugify";
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

export async function getTrailById(id: number): Promise<Trail | undefined> {
  const db = getDB();
  return await db.get<Trail>(
    "SELECT trails.*, regions.name AS region_name, regions.country AS region_country FROM trails INNER JOIN regions on trails.region_id = regions.id WHERE trails.id = ?",
    id,
  );
}

export async function addTrail(
  trail: Omit<
    Trail,
    "id" | "slug" | "created_at" | "region_name" | "region_country"
  >,
): Promise<number> {
  // Omit<Trail, "id" | ... > explicitly excludes values ( SQLite auto-generates it via AUTOINCREMENT)
  const db = getDB();
  const slug = slugify(trail.title);
  // timestamp
  const created_at = Math.floor(Date.now() / 1000);
  const result = await db.run(
    `INSERT INTO trails (region_id, title, slug, difficulty, distance_km, description, image_url, created_at) VALUES (@region_id, @title, @slug, @difficulty, @distance_km, @description, @image_url, @created_at)`,
    {
      "@region_id": trail.region_id,
      "@title": trail.title,
      "@slug": slug,
      "@difficulty": trail.difficulty,
      "@distance_km": trail.distance_km,
      "@description": trail.description,
      "@image_url": trail.image_url,
      "@created_at": created_at,
    },
  );
  return result.lastID!;
}

// WHERE adds a condition that each row must satisfy to be included
export async function updateTrail(
  id: number,
  trail: Omit<
    Trail,
    "id" | "slug" | "created_at" | "region_name" | "region_country"
  >,
): Promise<void> {
  const db = getDB();
  const slug = slugify(trail.title);
  await db.run(
    `UPDATE trails
        SET region_id = @region_id, title = @title, slug = @slug, difficulty = @difficulty, distance_km = @distance_km, description = @description, image_url = @image_url
    WHERE id = @id`,
    {
      "@region_id": trail.region_id,
      "@title": trail.title,
      "@slug": slug,
      "@difficulty": trail.difficulty,
      "@distance_km": trail.distance_km,
      "@description": trail.description,
      "@image_url": trail.image_url,
      "@id": id,
    },
  );
}

export async function deleteTrail(id: number): Promise<void> {
  const db = getDB();
  await db.run(`DELETE FROM trails WHERE id = @id`, { "@id": id });
}
