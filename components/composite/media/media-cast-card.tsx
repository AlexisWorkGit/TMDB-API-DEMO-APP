import Link from "next/link";

import { Cast } from "@/lib/tmdb/models";
import { MediaCard, MediaPoster } from "@/components/composite/media";

export const MediaCastCard: React.FC<Cast> = ({ id, name, profile_path, character }) => (
  <Link href={`/person/${id}`} prefetch={false}>
    <MediaCard.Root>
      <MediaPoster image={profile_path} alt={name} />
      <MediaCard.Content>
        <MediaCard.Title>{name}</MediaCard.Title>
        <MediaCard.Excerpt>{character}</MediaCard.Excerpt>
      </MediaCard.Content>
    </MediaCard.Root>
  </Link>
);
