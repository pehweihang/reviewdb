import { hash } from "bcryptjs";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "./entity/User";

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi";
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("name") name: string
  ) {
    const hashed = await hash(password, 11);
    try {
      await User.insert({
        email,
        password: hashed,
        name,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
