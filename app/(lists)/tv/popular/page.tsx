import { pages } from "@/config";

import type { SearchListTypeParams } from "@/types/search";
import { TvList } from "@/components/composite/tv";

interface ListPageProps {
  searchParams?: SearchListTypeParams;
}

export async function generateMetadata() {
  return {
    title: "Popular TV Shows",
    description: pages.tv.popular.description,
  };
}

export default async function Popular(props: ListPageProps) {
  const searchParams = await props.searchParams;
  return (
    <TvList
      list="popular"
      page={searchParams?.page ?? "1"}
      title={pages.tv.popular.title}
      description={pages.tv.popular.description}
    />
  );
}
