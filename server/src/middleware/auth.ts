import { verify } from "jsonwebtoken";
import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

interface Payload {
  uid: number;
  email: string;
  name: string;
  group: string;
}

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const auth = context.req.headers["authorization"];
  if (!auth) {
    throw new Error("Not authorized");
  }
  try {
    const token = auth.split(" ")[1];
    const payload = verify(token, process.env.JWT_ACCESS_SECRET!);
    context.payload = payload as Payload;
  } catch (err) {
    console.log(err);
    throw new Error("Not authorized");
  }
  return next();
};
