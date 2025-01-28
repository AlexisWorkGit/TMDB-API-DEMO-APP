import { MovieWithMediaType, PersonWithMediaType, TvShowWithMediaType } from "@/lib/tmdb/models";

export type SearchResultType = MovieWithMediaType | TvShowWithMediaType | PersonWithMediaType;

export type SearchListTypeParams = Promise<Record<string, string>>;
export type SearchTrendTypeParams = Promise<Record<string, string>>;

export type SearchReviewTypeParams = Promise<{
  page: string;
}>;

export type SearchMovieTypeParams = Promise<{
  page: string;
}>;

export type SearchTvTypeParams = Promise<{
  page: string;
  s: string;
}>;

export type SearchQueryTypeParams = Promise<{
  page: string;
  q: string;
}>;
