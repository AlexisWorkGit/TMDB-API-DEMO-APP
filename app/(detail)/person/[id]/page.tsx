import type { SimpleIdParams } from "@/types/params";
import { tmdb } from "@/lib/tmdb/api";
import { WithCombinedCredits, WithImages } from "@/lib/tmdb/api/types";
import { format } from "@/lib/tmdb/utils";
import { filterByDepartment, formatValue, getDepartments, getPersonHighlights } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MediaBackdrop,
  MediaDetailView,
  MediaImages,
  MediaPoster,
} from "@/components/composite/media";
import { MovieCard } from "@/components/composite/movie";
import { PersonCreditsTable } from "@/components/composite/person";
import { TvCard } from "@/components/composite/tv";

interface DetailProps {
  params: SimpleIdParams;
}

export async function generateMetadata(props: DetailProps) {
  const params = await props.params;
  const { name } = await tmdb.person.detail({
    id: params.id,
  });

  return {
    title: name,
  };
}

export default async function Detail(props: DetailProps) {
  const params = await props.params;
  const {
    name,
    profile_path,
    biography,
    birthday,
    place_of_birth,
    images: { profiles },
    known_for_department: department,
    combined_credits: { cast, crew },
  } = await tmdb.person.detail<WithCombinedCredits & WithImages>({
    id: params.id,
    append: "combined_credits,images",
  });

  const { highlights, hero } = getPersonHighlights({
    cast,
    crew,
    department,
  });

  const info = [birthday && format.date(birthday), place_of_birth].filter(Boolean).join(" — ");

  return (
    <MediaDetailView.Root>
      <MediaDetailView.Backdrop>
        <MediaBackdrop priority image={hero?.backdrop_path} alt={name} />

        {hero?.backdrop_path && (
          <Badge variant="secondary" className="absolute right-4 top-4 select-none">
            An image from {hero.media_type === "tv" ? hero.name : hero.title}, one of the
            productions that also features {name}.
          </Badge>
        )}
      </MediaDetailView.Backdrop>

      <MediaDetailView.Hero>
        <MediaDetailView.Poster>
          <MediaPoster priority image={profile_path} alt={name} size="w780" />
        </MediaDetailView.Poster>

        <div className="space-y-4">
          <MediaDetailView.Title>{name}</MediaDetailView.Title>
          <MediaDetailView.Overview>{info}</MediaDetailView.Overview>
          <MediaDetailView.Overview
            dangerouslySetInnerHTML={{
              __html: formatValue(biography, format.content),
            }}
          />
        </div>
      </MediaDetailView.Hero>

      <MediaDetailView.Content>
        <Tabs defaultValue="known">
          <TabsList className="mb-4">
            <TabsTrigger value="known">Known for</TabsTrigger>
            <TabsTrigger value="credits">Credits</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="known">
            {highlights.length > 0 ? (
              <div className="grid-list">
                {highlights?.map((item) =>
                  item.media_type === "movie" ? (
                    <MovieCard key={item.id} {...item} />
                  ) : (
                    <TvCard key={item.id} {...item} />
                  )
                )}
              </div>
            ) : (
              <div className="empty-box">No credits</div>
            )}
          </TabsContent>

          <TabsContent value="credits">
            <div className="space-y-8">
              {department === "Acting" && <PersonCreditsTable department="Acting" credits={cast} />}

              {getDepartments(crew).map((department) => (
                <PersonCreditsTable
                  key={department}
                  department={department}
                  credits={filterByDepartment(crew, department)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="images">
            <MediaImages profiles={profiles} />
          </TabsContent>
        </Tabs>
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  );
}
