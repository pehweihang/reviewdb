import { isAuth } from "../middleware/auth";
import { Group, GroupInviteLink } from "../entity/Group";
import { User } from "../entity/User";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { MyContext } from "../types";
import { v4 } from "uuid";

const createGroupLink = async (user: User, group: Group): Promise<String> => {
  const token = v4();
  const inviteLink = new GroupInviteLink();
  inviteLink.user = user;
  inviteLink.group = group;
  inviteLink.joinGroupToken = token;
  inviteLink.joinGroupExpire = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  await inviteLink.save();
  return inviteLink.id + "=" + token;
};

@Resolver()
export class GroupResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createGroup(
    @Ctx() { payload }: MyContext,
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

      group.users = [user];
      group.save();
      console.log(user);

      return true;
    } else {
      throw new Error("User not found");
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinGroup(
    @Ctx() { payload }: MyContext,
    @Arg("token") token: string
  ): Promise<Boolean> {
    const user = await User.findOne({ id: payload!.uid });
    const joinGroupToken = token.split("=")[1];
    const inviteLink = await GroupInviteLink.findOne(
      { id: token.split("=")[0] },
      { relations: ["group"] }
    );
    if (inviteLink) {
      const group = inviteLink.group;
      if (user && group) {
        if (
          inviteLink.joinGroupToken === joinGroupToken &&
          inviteLink.joinGroupExpire.getTime() > Date.now()
        ) {
          user.group = group;
          await user.save();
          return true;
        } else {
          throw new Error("Invalid or expired link.");
        }
      } else {
        throw new Error("User or group not found");
      }
    } else {
      throw new Error("Invalid or expired link.");
    }
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async getGroupLink(@Ctx() { payload }: MyContext): Promise<String> {
    const user = await User.findOne(
      { id: payload!.uid },
      { relations: ["group"] }
    );
    if (user) {
      const group = user.group;
      if (!group) throw new Error("User not in group");
      const inviteLink = await GroupInviteLink.findOne({
        group: group,
        user: user,
      });
      if (inviteLink) {
        if (
          inviteLink.joinGroupExpire.getTime() >
          Date.now() + 1000 * 60 * 60 * 24 * 2
        ) {
          return inviteLink.id + "=" + inviteLink.joinGroupToken;
        } else {
          GroupInviteLink.delete({ id: inviteLink.id });
          return createGroupLink(user, group);
        }
      } else {
        return createGroupLink(user, group);
      }
    } else {
      throw new Error("User not found");
    }
  }
}
