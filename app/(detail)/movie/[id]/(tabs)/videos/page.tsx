import { SimpleIdParams } from "@/types/params";
import { tmdb } from "@/lib/tmdb/api";
import { VideoList } from "@/components/composite/video";

interface DetailVideosProps {
  params: SimpleIdParams;
}

export async function generateMetadata(props: DetailVideosProps) {
  const params = await props.params;
  const { title } = await tmdb.movie.detail({
    id: params.id,
  });

  return {
    title: `Videos - ${title}`,
  };
}

export default async function DetailVideos(props: DetailVideosProps) {
  const params = await props.params;
  return <VideoList type="movie" id={params.id} />;
}
