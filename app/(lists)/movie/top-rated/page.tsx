import { pages } from "@/config";

import type { SearchListTypeParams } from "@/types/search";
import { MovieList } from "@/components/composite/movie";

interface ListPageProps {
  searchParams?: SearchListTypeParams;
}

export async function generateMetadata() {
  return {
    title: "Top Rated Movies",
    description: pages.movie.topRated.description,
  };
}

export default async function TopRated(props: ListPageProps) {
  const searchParams = await props.searchParams;
  return (
    <MovieList
      list="top_rated"
      page={searchParams?.page ?? "1"}
      title={pages.movie.topRated.title}
      description={pages.movie.topRated.description}
    />
  );
}
