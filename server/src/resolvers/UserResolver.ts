import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entity/User";
import { createAccessToken, sendRefreshToken } from "../token";
import { compare, hash } from "bcryptjs";
import { isAuth } from "../middleware/auth";
import { InvalidToken } from "../entity/InvalidToken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    return payload!.email;
  }

  @Mutation(() => LoginResponse)
  async register(
    @Ctx() { res }: MyContext,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("password2") password2: string,
    @Arg("name") name: string
  ): Promise<LoginResponse> {
    console.log(" Email:" + email + " Name:" + name + "Password" + password);
    if (!(name && email && password && password2)) {
      throw new Error("Fields cannot be empty.");
    }

    if (password.length < 8 || password2.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }

    if (password != password2) {
      throw new Error("Passwords do not match.");
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      throw new Error("Please enter a valid email.");
    }

    const hashed = await hash(password, 11);
    try {
      await User.insert({
        email,
        password: hashed,
        name,
      });
    } catch (err) {
      throw new Error(err);
    }

    const user = await User.findOne({ email });
    sendRefreshToken(user!, res);
    return { accessToken: createAccessToken(user!) };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Ctx() { res }: MyContext,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ email }, { relations: ["group"] });
    if (!user) {
      throw new Error("Wrong email or password");
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new Error("Wrong email or password");
    }

    sendRefreshToken(user!, res);
    return { accessToken: createAccessToken(user!) };
  }

  @Mutation(() => LoginResponse)
  async logout(@Ctx() { req, res }: MyContext): Promise<LoginResponse> {
    const token = req.cookies.oid;
    if (!token) {
      res.cookie("oid", "");
      return { accessToken: "" };
    }
    try {
      await InvalidToken.insert({ token: token });
    } catch {}
    res.cookie("oid", "");
    return { accessToken: "" };
  }
}
