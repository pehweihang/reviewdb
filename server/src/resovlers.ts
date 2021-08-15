import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
} from "type-graphql";
import { Context } from "./Context";
import { User } from "./entity/User";

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

  @Mutation(() => LoginResponse)
  async register(
    @Ctx() { res }: Context,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("name") name: string
  ): Promise<LoginResponse> {
    const hashed = await hash(password, 11);
    try {
      const user = await User.insert({
        email,
        password: hashed,
        name,
      });
    } catch (err) {
      console.log(err);
    }
    return {
      accessToken: sign(
        { uid: user.id, email: user.email, name: user.name },
        process.env.JWT_ACCESS!,
        {
          expiresIn: "5m",
        }
      ),
    };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Ctx() { res }: Context,
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

    res.cookie(
      "oid",
      sign({ uid: user.id }, process.env.JWT_REFRESH!, { expiresIn: "7d" }),
      { httpOnly: true }
    );

    return {
      accessToken: sign(
        { uid: user.id, email: user.email, name: user.name },
        process.env.JWT_ACCESS!,
        {
          expiresIn: "5m",
        }
      ),
    };
  }
}
