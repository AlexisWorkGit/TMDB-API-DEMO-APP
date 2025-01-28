import { cookies } from "next/headers";
import { pages } from "@/config";

import type { SearchListTypeParams } from "@/types/search";
import { tmdb } from "@/lib/tmdb/api";
import { SortByType } from "@/lib/tmdb/api/types";
import { filterDiscoverParams } from "@/lib/utils";
import { DiscoverFilters, DiscoverSort } from "@/components/composite/discover";
import { ListPagination } from "@/components/composite/list";
import { TvCard } from "@/components/composite/tv";

interface ListPageProps {
  searchParams?: SearchListTypeParams;
}

export async function generateMetadata() {
  return {
    title: "Discover TV Shows",
    description: pages.tv.discover.description,
  };
}

export default async function Discover(props: ListPageProps) {
  const searchParams = await props.searchParams;
  const cookieStore = await cookies();
  const region = cookieStore.get("region")?.value ?? "US";

  const {
    results: tvShows,
    page: currentPage,
    total_pages: totalPages,
  } = await tmdb.discover.tv({
    watch_region: region,
    page: searchParams?.page,
    sort_by: searchParams?.sort_by as SortByType,
    ...filterDiscoverParams(searchParams),
  });

  const { results: providers } = await tmdb.watchProviders.tv({
    region,
  });

  const { genres } = await tmdb.genres.tv();

  return (
    <div className="container space-y-8">
      <div className="md:mb-12 md:mt-6">
        <h1 className="mb-2 text-2xl font-medium">{pages.tv.discover.title}</h1>
        <p className="max-w-3xl text-muted-foreground">{pages.tv.discover.description}</p>
      </div>

      <div className="flex justify-end gap-2">
        <DiscoverFilters type="tv" genres={genres} providers={providers} />
        <DiscoverSort type="tv" />
      </div>

      {tvShows.length ? (
        <div className="grid-list">
          {tvShows.map((tv) => (
            <TvCard key={tv.id} {...tv} />
          ))}
        </div>
      ) : (
        <div className="container flex justify-center pb-[30dvh]">
          <div className="text-center">
            <h1 className="text-2xl">No TV Shows found for the selected filters.</h1>
            <p className="text-muted-foreground">
              Try removing some of the filters to get more results.
            </p>
          </div>
        </div>
      )}

      {tvShows?.length > 0 && <ListPagination currentPage={currentPage} totalPages={totalPages} />}
    </div>
  );
}
