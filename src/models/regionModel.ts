import { getDB } from "./db";

export interface Region {
  id?: number;
  name: string;
  slug: string;
  country: string;
  description: string;
}

export async function getAllRegions(): Promise<Region[]> {
  const db = getDB();
  return await db.all<Region[]>("SELECT * FROM regions");
}

export async function getRegionsBySlug(
  slug: string,
): Promise<Region | undefined> {
  const regions = await getAllRegions();
}
