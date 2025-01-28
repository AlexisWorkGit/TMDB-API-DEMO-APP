import { pages } from "@/config";

import type { SearchListTypeParams } from "@/types/search";
import { PersonList } from "@/components/composite/person";

interface ListPageProps {
  searchParams?: SearchListTypeParams;
}

export async function generateMetadata() {
  return {
    title: "Popular People",
    description: pages.people.popular.description,
  };
}

export default async function Popular(props: ListPageProps) {
  const searchParams = await props.searchParams;
  return (
    <PersonList
      list="popular"
      page={searchParams?.page ?? "1"}
      title={pages.people.popular.title}
      description={pages.people.popular.description}
    />
  );
}
