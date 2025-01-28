import type { SimpleIdParams } from "@/types/params";
import { tmdb } from "@/lib/tmdb/api";
import { MediaImages } from "@/components/composite/media";

interface DetailImagesProps {
  params: SimpleIdParams;
}

export async function generateMetadata(props: DetailImagesProps) {
  const params = await props.params;
  const { name } = await tmdb.tv.detail({
    id: params.id,
  });

  return {
    title: `Images - ${name}`,
  };
}

export default async function DetailImages(props: DetailImagesProps) {
  const params = await props.params;
  const { posters, backdrops } = await tmdb.tv.images({
    id: params.id,
    langs: "en",
  });
  return <MediaImages posters={posters} backdrops={backdrops} />;
}
