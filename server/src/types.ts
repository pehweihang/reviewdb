import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { uid: string; email: string; name: string; group: string };
}
