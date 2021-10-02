import { Request, Response } from "express";

export interface Payload {
  uid: string;
  email: string;
  name: string;
  groupName: string;
  groupId: string;
}

export interface MyContext {
  req: Request;
  res: Response;
  payload?: Payload;
}
