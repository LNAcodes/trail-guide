import { type Request, type Response, type NextFunction } from "express";
import { access, appendFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const LOG_FILE = path.join(process.cwd(), "logs", "access.log");

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

export async function ensureLogFile(filePath: string): Promise<void> {
  const exists = await fileExists(filePath);
  if (!exists) {
    await writeFile(filePath, "", { encoding: "utf-8" });
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  res.on("finish", async () => {
    const logEntry = [
      new Date().toISOString(),
      req.method,
      req.ip,
      req.originalUrl,
      res.statusCode,
    ].join(" ");

    await appendFile(LOG_FILE, logEntry + "\n", { encoding: "utf-8" });
  });

  next();
}
