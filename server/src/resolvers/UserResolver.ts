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
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../token";
import { compare, hash } from "bcryptjs";
import { isAuth } from "../middleware/auth";
import { InvalidToken } from "../entity/InvalidToken";
import { v4 } from "uuid";
import { sendEmail } from "../utils/sendEmail";

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
    sendRefreshToken(res, createRefreshToken(user!));
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

    sendRefreshToken(res, createRefreshToken(user));
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

  @Mutation(() => Boolean)
  async resetPasswordEmail(@Arg("email") email: string): Promise<Boolean> {
    const user = await User.findOne({ email });
    if (!user) return true;
    const token = v4();
    sendEmail(
      email,
      "Forget Password",
      `Password reset link: ${
        process.env.FRONTEND_URL! + "passwordreset/" + user.id + "=" + token
      }`
    );
    user.resetPasswordToken = token;
    user.resetPasswordExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24); //one day
    await user.save();
    return true;
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("password") password: string
  ): Promise<Boolean> {
    if (password.length < 8)
      throw new Error("Password must at least be 8 characters");
    const user = await User.findOne({ id: token.split("=")[0] });
    if (!user) throw new Error("User not found");

    if (
      user.resetPasswordToken === token.split("=")[1] &&
      user.resetPasswordExpiry!.getTime() > Date.now()
    ) {
      user.password = await hash(password, 11);
      user.resetPasswordToken = null;
      user.resetPasswordExpiry = null;
      await user.save();
      return true;
    } else {
      throw new Error("Invalid or expired link.");
    }
  }
}
