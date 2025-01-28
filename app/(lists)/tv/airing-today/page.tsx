import { pages } from "@/config";

import type { SearchListTypeParams } from "@/types/search";
import { TvList } from "@/components/composite/tv";

interface ListPageProps {
  searchParams?: SearchListTypeParams;
}

export async function generateMetadata() {
  return {
    title: "Airing Today TV Shows",
    description: pages.tv.airingToday.description,
  };
}

export default async function AiringToday(props: ListPageProps) {
  const searchParams = await props.searchParams;
  return (
    <TvList
      list="airing_today"
      page={searchParams?.page ?? "1"}
      title={pages.tv.airingToday.title}
      description={pages.tv.airingToday.description}
    />
  );
}
