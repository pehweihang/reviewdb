import { isAuth } from "src/auth";
import { Group } from "src/entity/Group";
import { User } from "src/entity/User";
import { ExpressContext } from "src/ExpressContext";
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
      const group = new Group();
      group.name = groupName;
      group.users = [user];
      await group.save();

      // add group to user
      user.group = group.id;
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
      user.group = group.id;
      return true;
    } else {
      throw new Error("User or group not found");
    }
  }
}
