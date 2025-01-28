import { Genre } from "@/lib/tmdb/models/commons";
import { useMultiSelect } from "@/hooks/use-multi-select";
import { badgeVariants } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface DiscoverFilterGenreProps {
  value: string;
  genres: Genre[];
  onChange: (value: string) => void;
}

export const DiscoverFilterGenre: React.FC<DiscoverFilterGenreProps> = ({
  value,
  genres,
  onChange,
}) => {
  const { selection, toggleSelection } = useMultiSelect({
    value,
    logic: "and",
    onChange,
  });

  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground">Genres</Label>

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={badgeVariants({
              variant: selection.includes(genre.id) ? "default" : "secondary",
            })}
            onClick={() => toggleSelection(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};
