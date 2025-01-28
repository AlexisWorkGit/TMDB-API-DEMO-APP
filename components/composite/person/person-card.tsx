import React from "react";
import Link from "next/link";

import { Person } from "@/lib/tmdb/models";
import { MediaCard, MediaPoster } from "@/components/composite/media";

export const PersonCard: React.FC<Person> = ({ id, name, profile_path, known_for_department }) => {
  return (
    <Link href={`/person/${id}`} key={id} className="w-full" prefetch={false}>
      <MediaCard.Root>
        <MediaPoster image={profile_path} alt={name} />
        <MediaCard.Content>
          <MediaCard.Title className="mt-2">{name}</MediaCard.Title>

          <MediaCard.Excerpt>Known for {known_for_department}</MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </Link>
  );
};
