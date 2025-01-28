import { pages } from "@/config";

import type { SearchListTypeParams } from "@/types/search";
import { TvList } from "@/components/composite/tv";

interface ListPageProps {
  searchParams?: SearchListTypeParams;
}

export async function generateMetadata() {
  return {
    title: "Top Rated TV Shows",
    description: pages.tv.topRated.description,
  };
}

export default async function TopRated(props: ListPageProps) {
  const searchParams = await props.searchParams;
  return (
    <TvList
      list="top_rated"
      page={searchParams?.page ?? "1"}
      title={pages.tv.topRated.title}
      description={pages.tv.topRated.description}
    />
  );
}
