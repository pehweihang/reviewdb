import { isAuth } from "../auth";
import { Group } from "../entity/Group";
import { User } from "../entity/User";
import { ExpressContext } from "../ExpressContext";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class GroupResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createGroup(
    @Ctx() { payload }: ExpressContext,
    @Arg("groupName") groupName: string
  ): Promise<Boolean> {
    const user = await User.findOne({ id: payload!.uid });
    if (user) {
      // create new group

      const group = Group.create({
        users: [],
        name: groupName,
      });

      user.group = group;
      await user.save();

      return true;
    } else {
      throw new Error("User not found");
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinGroup(
    @Ctx() { payload }: ExpressContext,
    @Arg("groupUuid") groupUuid: string
  ): Promise<Boolean> {
    const user = await User.findOne({ id: payload!.uid });
    const group = await Group.findOne({ id: groupUuid });
    if (user && group) {
      user.group = group;
      await user.save();
      return true;
    } else {
      throw new Error("User or group not found");
    }
  }
}
