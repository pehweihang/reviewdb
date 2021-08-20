import { Review } from "../entity/Reviews";
import { User } from "../entity/User";
import { ExpressContext } from "../ExpressContext";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../auth";

@Resolver()
export class ReviewResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addReview(
    @Ctx() { payload }: ExpressContext,
    @Arg("contentId") contentId: number,
    @Arg("contentName") contentName: string,
    @Arg("imageUrl") imageUrl: string,
    @Arg("reviewText") reviewText: string,
    @Arg("rating") rating: number
  ): Promise<Boolean> {
    const user = await User.findOne(
      { id: payload!.uid },
      { relations: ["group"] }
    );
    if (user) {
      console.log(user.group);
      const review = new Review();
      review.contentId = contentId;
      review.contentName = contentName;
      review.imageUrl = imageUrl;
      review.rating = rating;
      review.reviewText = reviewText;
      review.user = user;
      review.group = user.group;
      console.log(review);
      await review.save();
      return true;
    } else {
      throw new Error("User not found.");
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteReview(@Arg("reviewId") reviewId: number) {
    await Review.delete(reviewId);
    return true;
  }
}
