import React from "react";

import { tmdb } from "@/lib/tmdb/api";
import { yt } from "@/lib/tmdb/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VideoCard } from "@/components/composite/video";

interface VideoListProps {
  id: string;
  type: "movie" | "tv";
}

export const VideoList: React.FC<VideoListProps> = async ({ id, type }) => {
  const { results: videos } = await tmdb[type].videos({ id });

  if (!videos?.length) return <div className="empty-box">No videos</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {videos.map(({ id, key, name }) => (
        <Dialog modal key={id}>
          <DialogTrigger asChild>
            <VideoCard name={name} ytKey={key} />
          </DialogTrigger>

          <DialogContent className="max-w-screen-lg">
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
            </DialogHeader>

            <iframe
              title={`Video player for ${name}`}
              className="aspect-square size-full rounded-md sm:aspect-video"
              src={yt.video(key, true)}
              allow="autoplay; encrypted-media"
              allowFullScreen={true}
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};
