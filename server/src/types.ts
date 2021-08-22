import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { uid: number; email: string; name: string; group: string };
}
