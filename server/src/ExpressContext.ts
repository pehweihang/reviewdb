import { Request, Response } from "express";

export interface ExpressContext {
  req: Request;
  res: Response;
  payload?: { uid: number; email: string; name: string };
}
