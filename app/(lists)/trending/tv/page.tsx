import { pages } from "@/config";

import type { SearchTrendTypeParams } from "@/types/search";
import { TrendList } from "@/components/composite/trend";

interface TrendingPageProps {
  searchParams?: SearchTrendTypeParams;
}

export async function generateMetadata() {
  return {
    title: "Trending TV Shows",
    description: pages.trending.tv.description,
  };
}

export default async function TrendingPage(props: TrendingPageProps) {
  const searchParams = await props.searchParams;
  return (
    <TrendList
      type="tv"
      time="day"
      title="Trending TV Shows"
      description={pages.trending.tv.description}
      page={searchParams?.page ?? "1"}
    />
  );
}
