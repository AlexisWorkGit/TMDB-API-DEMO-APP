import { pages } from "@/config";

import type { SearchTrendTypeParams } from "@/types/search";
import { TrendList } from "@/components/composite/trend";

interface TrendingPageProps {
  searchParams?: SearchTrendTypeParams;
}

export async function generateMetadata() {
  return {
    title: "Trending Movies",
    description: pages.trending.movie.description,
  };
}

export default async function TrendingPage(props: TrendingPageProps) {
  const searchParams = await props.searchParams;
  return (
    <TrendList
      type="movie"
      time="day"
      title="Trending Movies"
      description={pages.trending.movie.description}
      page={searchParams?.page ?? "1"}
    />
  );
}
