import { pages } from "@/config";

import type { SearchListTypeParams } from "@/types/search";
import { MovieList } from "@/components/composite/movie";

interface ListPageProps {
  searchParams?: SearchListTypeParams;
}

export async function generateMetadata() {
  return {
    title: "Upcoming Movies",
    description: pages.movie.upcoming.description,
  };
}

export default async function Upcoming(props: ListPageProps) {
  const searchParams = await props.searchParams;
  return (
    <MovieList
      list="upcoming"
      page={searchParams?.page ?? "1"}
      title={pages.movie.upcoming.title}
      description={pages.movie.upcoming.description}
    />
  );
}
