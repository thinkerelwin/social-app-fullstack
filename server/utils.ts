import { Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";

export function middlewareWrapper(
  callback: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next);
  };
}

export function getDirname() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return __dirname;
}
