import { pages } from "@/config";

import type { SearchListTypeParams } from "@/types/search";
import { MovieList } from "@/components/composite/movie";

interface ListPageProps {
  searchParams?: SearchListTypeParams;
}

export async function generateMetadata() {
  return {
    title: "Now Playing Movies",
    description: pages.movie.nowPlaying.description,
  };
}

export default async function NowPlaying(props: ListPageProps) {
  const searchParams = await props.searchParams;
  return (
    <MovieList
      list="now_playing"
      page={searchParams?.page ?? "1"}
      title={pages.movie.nowPlaying.title}
      description={pages.movie.nowPlaying.description}
    />
  );
}
