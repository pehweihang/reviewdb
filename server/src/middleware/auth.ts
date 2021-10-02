import { verify } from "jsonwebtoken";
import { MyContext, Payload } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const auth = context.req.headers["authorization"];
  if (!auth) {
    throw new Error("Not authorized");
  }
  try {
    console.log(auth);
    const token = auth.split(" ")[1];
    const payload = verify(token, process.env.JWT_ACCESS_SECRET!);
    context.payload = payload as Payload;
  } catch (err) {
    console.log(err);
    throw new Error("Not authorized");
  }
  return next();
};
