import { pages } from "@/config";

import type { SearchListTypeParams } from "@/types/search";
import { MovieList } from "@/components/composite/movie";

interface ListPageProps {
  searchParams?: SearchListTypeParams;
}

export async function generateMetadata() {
  return {
    title: "Popular Movies",
    description: pages.movie.popular.description,
  };
}

export default async function Popular(props: ListPageProps) {
  const searchParams = await props.searchParams;
  return (
    <MovieList
      list="popular"
      page={searchParams?.page ?? "1"}
      title={pages.movie.popular.title}
      description={pages.movie.popular.description}
    />
  );
}
