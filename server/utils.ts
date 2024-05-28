import { Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { doubleCsrf } from "csrf-csrf";

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

const {
  generateToken,
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
  getSecret: () => "SecretKey", // A function that optionally takes the request and returns a secret
  cookieName: "x-csrf-token",
  cookieOptions: {
    sameSite: false,
    secure: false,
  },
});

export { generateToken, doubleCsrfProtection };
