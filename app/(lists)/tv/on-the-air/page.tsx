import { pages } from "@/config";

import type { SearchListTypeParams } from "@/types/search";
import { TvList } from "@/components/composite/tv";

interface ListPageProps {
  searchParams?: SearchListTypeParams;
}

export async function generateMetadata() {
  return {
    title: "On The Air TV Shows",
    description: pages.tv.onTheAir.description,
  };
}

export default async function OnTheAir(props: ListPageProps) {
  const searchParams = await props.searchParams;
  return (
    <TvList
      list="on_the_air"
      page={searchParams?.page ?? "1"}
      title={pages.tv.onTheAir.title}
      description={pages.tv.onTheAir.description}
    />
  );
}
