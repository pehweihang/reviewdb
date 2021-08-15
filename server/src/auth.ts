import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { ExpressContext } from "./ExpressContext";

export const isAuth: MiddlewareFn<ExpressContext> = ({ context }, next) => {
  const auth = context.req.headers["authorization"];
  if (!auth) {
    throw new Error("Not authorized");
  }
  try {
    const token = auth.split(" ")[1];
    const payload = verify(token, process.env.JWT_ACCESS_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Not authorized");
  }
  return next();
};
