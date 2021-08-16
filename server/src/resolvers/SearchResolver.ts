import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";
import axios from "axios";

@ObjectType()
class SearchResponse {
  @Field()
  url: string;

  @Field()
  image_url: string;

  @Field()
  title: string;
}

@Resolver()
export class SearchResolver {
  @Query(() => [SearchResponse])
  async malSearch(
    @Arg("q") q: string,
    @Arg("type") type: string
  ): Promise<[SearchResponse]> {
    const res = await axios.get(
      `${process.env.SEARCH_API_URL!}${type}?q=${q}&page=1`
    );
    const results = res.data.results.slice(0, 5);
    const ret = results.map((result: any) => {
      return {
        title: result.title,
        url: result.url,
        image_url: result.image_url,
      };
    });
    return ret;
  }
}
