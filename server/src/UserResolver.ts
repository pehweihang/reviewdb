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
import { ExpressContext } from "./ExpressContext";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./createTokens";
import { compare, hash } from "bcryptjs";
import { isAuth } from "./auth";

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
  bye(@Ctx() { payload }: ExpressContext) {
    return payload!.email;
  }

  @Mutation(() => LoginResponse)
  async register(
    @Ctx() { res }: ExpressContext,
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
    res.cookie("oid", createRefreshToken(user!));
    return { accessToken: createAccessToken(user!) };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Ctx() { res }: ExpressContext,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Wrong email or password");
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new Error("Wrong email or password");
    }

    res.cookie("oid", createRefreshToken(user!));
    return { accessToken: createAccessToken(user!) };
  }
}
