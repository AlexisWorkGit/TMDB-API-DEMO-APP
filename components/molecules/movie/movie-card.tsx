import React from "react";
import Link from "next/link";

import { Movie } from "@/lib/tmdb/models";
import { format } from "@/lib/tmdb/utils";
import { formatValue } from "@/lib/utils";
import { MediaCard, MediaPoster, MediaRating } from "@/components/molecules/media";

export const MovieCard: React.FC<Movie> = ({
  id,
  poster_path,
  title,
  vote_average,
  vote_count,
  release_date,
}) => {
  return (
    <Link href={`/movie/${id}`} key={id} prefetch={false}>
      <MediaCard.Root>
        <MediaPoster image={poster_path} alt={title} />
        <MediaCard.Content>
          <MediaRating average={vote_average} count={vote_count} className="mb-2" />
          <MediaCard.Title>{title}</MediaCard.Title>
          <MediaCard.Excerpt>{formatValue(release_date, format.year)}</MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  );
};
