import { Review } from "../entity/Reviews";
import { User } from "../entity/User";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/auth";

@ObjectType()
class ReviewResponse {
  @Field()
  contentId: number;

  @Field()
  contentName: string;

  @Field()
  imageUrl: string;

  @Field()
  rating: number;

  @Field()
  reviewText: string;
}

@Resolver()
export class ReviewResolver {
  @Query(() => [ReviewResponse])
  @UseMiddleware(isAuth)
  async getReviewsGroup(
    @Ctx() { payload }: MyContext
  ): Promise<[ReviewResponse]> {
    const reviews = await Review.find({ where: { group: payload!.group } });
    console.log(reviews);
    return reviews as any;
  }

  @Query(() => [ReviewResponse])
  @UseMiddleware(isAuth)
  async getReiewsUser(
    @Ctx() { payload }: MyContext
  ): Promise<[ReviewResponse]> {
    const reviews = await Review.find({ where: { user: payload!.uid } });
    console.log(reviews);
    return reviews as any;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addReview(
    @Ctx() { payload }: MyContext,
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
  async deleteReview(@Arg("reviewId") reviewId: number): Promise<Boolean> {
    await Review.delete(reviewId);
    return true;
  }
}
