import { PropsWithChildren } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { SimpleIdParams } from "@/types/params";
import { tmdb } from "@/lib/tmdb/api";
import { WithVideos } from "@/lib/tmdb/api/types";
import { format } from "@/lib/tmdb/utils";
import { Tabs, TabsLink, TabsList } from "@/components/ui/tabs";
import {
  MediaBackdrop,
  MediaDetailView,
  MediaPoster,
  MediaRating,
  MediaTrailerDialog,
} from "@/components/composite/media";
import { InfoTooltip } from "@/components/composite/tooltip";

interface DetailLayoutProps {
  params: SimpleIdParams;
}

export async function generateMetadata(props: DetailLayoutProps) {
  const params = await props.params;
  const { name } = await tmdb.tv.detail({
    id: params.id,
  });

  return {
    title: name,
  };
}

export default async function DetailLayout(props: PropsWithChildren<DetailLayoutProps>) {
  const params = await props.params;
  const children = props.children;
  const {
    id,
    name,
    overview,
    backdrop_path,
    poster_path,
    genres,
    vote_average,
    vote_count,
    tagline,
    videos,
  } = await tmdb.tv.detail<WithVideos>({
    id: params.id,
    append: "videos",
  });

  if (!id) return notFound();

  return (
    <MediaDetailView.Root>
      <MediaDetailView.Backdrop>
        <MediaBackdrop priority image={backdrop_path} alt={name} />
      </MediaDetailView.Backdrop>

      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <MediaPoster priority image={poster_path} alt={name} size="w780" />
        </MediaDetailView.Poster>

        <div className="space-y-4">
          <MediaDetailView.Genres>
            <MediaRating average={vote_average} count={vote_count} />
            {genres?.map((genre) => (
              <Link key={genre.id} href={`/tv/discover?with_genres=${genre.id}`}>
                <MediaDetailView.Genre>{genre.name}</MediaDetailView.Genre>
              </Link>
            ))}
          </MediaDetailView.Genres>

          <MediaDetailView.Title>{name}</MediaDetailView.Title>

          {tagline && <MediaDetailView.Overview>&quot;{tagline}&quot;</MediaDetailView.Overview>}

          <MediaDetailView.Overview
            dangerouslySetInnerHTML={{ __html: format.content(overview) }}
          />

          <MediaTrailerDialog videos={videos?.results} />
        </div>
      </MediaDetailView.Hero>

      <MediaDetailView.Content>
        <Tabs className="mt-8 lg:mt-12">
          <div className="max-w-screen scrollbar-hidden -mx-8 overflow-x-scroll px-8 lg:m-0 lg:p-0">
            <TabsList>
              <TabsLink href={`/tv/${id}`}>Overview</TabsLink>
              <TabsLink className="gap-2" href={`/tv/${id}/credits`}>
                Credits
                <InfoTooltip>
                  You can see season credits and guest stars in seasons tab.
                </InfoTooltip>
              </TabsLink>
              <TabsLink href={`/tv/${id}/watch`}>Watch</TabsLink>
              <TabsLink href={`/tv/${id}/reviews`}>Reviews</TabsLink>
              <TabsLink href={`/tv/${id}/seasons`}>Seasons</TabsLink>
              <TabsLink href={`/tv/${id}/images`}>Images</TabsLink>
              <TabsLink href={`/tv/${id}/videos`}>Videos</TabsLink>
              <TabsLink href={`/tv/${id}/recommendations`}>Recommendations</TabsLink>
              <TabsLink href={`/tv/${id}/similar`}>Similar</TabsLink>
            </TabsList>
          </div>
        </Tabs>
        <div className="mt-4">{children}</div>
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  );
}
