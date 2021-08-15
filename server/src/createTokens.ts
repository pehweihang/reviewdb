import { sign } from "jsonwebtoken";
import { User } from "./entity/User";

export const createAccessToken = (user: User) => {
  return sign(
    {
      uid: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_ACCESS_SECRET!,
    {
      expiresIn: "5m",
    }
  );
};

export const createRefreshToken = (user: User) => {
  return sign(
    {
      uid: user.id,
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};
