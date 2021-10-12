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
import { Anime, Manga } from "src/entity/Content";

@ObjectType()
class ReviewResponse {
  @Field()
  contentId: number;

  @Field()
  contentName: string;

  @Field()
  imageUrl: string;

  @Field()
  decription: string;

  @Field()
  reviews: Reviews;
}

@ObjectType()
class Reviews {
  @Field()
  reviewId: number;

  @Field()
  reviewer: string;

  @Field()
  reviewText: number;

  @Field()
  rating: number;
}

@Resolver()
export class ReviewResolver {
  @Query(() => [ReviewResponse])
  @UseMiddleware(isAuth)
  async getReviewsGroup(
    @Ctx() { payload }: MyContext
  ): Promise<[ReviewResponse]> {
    const reviews = await Review.find({ where: { group: payload!.groupName } });
    return reviews as any;
  }

  @Query(() => [ReviewResponse])
  @UseMiddleware(isAuth)
  async getReviewsUser(
    @Ctx() { payload }: MyContext
  ): Promise<[ReviewResponse]> {
    const reviews = await Review.find({ where: { user: payload!.uid } });
    return reviews as any;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addReview(
    @Ctx() { payload }: MyContext,
    @Arg("contentId") contentId: number,
    @Arg("contentName") contentName: string,
    @Arg("contentType") contentType: string,
    @Arg("imageUrl") imageUrl: string,
    @Arg("description") description: string,
    @Arg("reviewText") reviewText: string,
    @Arg("rating") rating: number
  ): Promise<Boolean> {
    const user = await User.findOne(
      { id: payload!.uid },
      { relations: ["group"] }
    );
    if (user) {
      // check if anime/manga exists in db
      if (
        contentType == "anime"
          ? !(await Anime.findOne("contentId"))
          : !Manga.findOne("contentId")
      ) {
        const content = contentType == "anime" ? new Anime() : new Manga();
        content.id = contentId;
        content.title = contentName;
        content.img_url = imageUrl;
        content.description = description;
        content.save();
      }

      const review = new Review();
      review.contentId = contentId;
      review.contentType = contentType;
      review.rating = rating;
      review.reviewText = reviewText;
      review.user = user;
      review.group = user.group;
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
