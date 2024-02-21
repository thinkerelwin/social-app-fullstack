import { Request, Response, NextFunction } from "express";

export function middlewareWrapper(
  callback: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next);
  };
}
