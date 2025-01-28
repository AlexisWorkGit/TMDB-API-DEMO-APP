import { SimpleIdParams } from "@/types/params";
import { MediaWatchProviders } from "@/components/composite/media";

interface DetailWatchProps {
  params: SimpleIdParams;
}

export default async function DetailWatch(props: DetailWatchProps) {
  const params = await props.params;
  return <MediaWatchProviders id={params.id} type="movie" />;
}
