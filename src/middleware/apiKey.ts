import { type Request, type Response, type NextFunction } from "express";

export function apiKey(req: Request, res: Response, next: NextFunction) {
  const key = req.header("x-api-key");

  if (key !== process.env.API_KEY) {
    res.status(404).json({ error: "Invalid or missing API key" });
    return;
  }
  next();
}
