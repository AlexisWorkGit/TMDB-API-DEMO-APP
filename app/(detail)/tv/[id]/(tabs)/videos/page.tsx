import type { SimpleIdParams } from "@/types/params";
import { tmdb } from "@/lib/tmdb/api";
import { VideoList } from "@/components/composite/video";

interface VideosProps {
  params: SimpleIdParams;
}

export async function generateMetadata(props: VideosProps) {
  const params = await props.params;
  const { name } = await tmdb.tv.detail({
    id: params.id,
  });

  return {
    title: `Videos - ${name}`,
  };
}

export default async function DetailVideos(props: VideosProps) {
  const params = await props.params;
  return <VideoList type="tv" id={params.id} />;
}
