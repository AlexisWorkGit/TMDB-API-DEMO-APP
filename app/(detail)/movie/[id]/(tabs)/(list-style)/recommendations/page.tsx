import type { SimpleIdParams } from "@/types/params";
import type { SearchMovieTypeParams } from "@/types/search";
import { tmdb } from "@/lib/tmdb/api";
import { ListPagination } from "@/components/molecules/list";
import { MovieCard } from "@/components/molecules/movie";

interface DetailRecommendationsProps {
  params: SimpleIdParams;
  searchParams: SearchMovieTypeParams;
}

export async function generateMetadata(props: DetailRecommendationsProps) {
  const params = await props.params;
  const { title } = await tmdb.movie.detail({
    id: params.id,
  });

  return {
    title: `Recommendations - ${title}`,
  };
}

export default async function DetailRecommendations(props: DetailRecommendationsProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const {
    results: movies,
    total_pages: totalPages,
    page: currentPage,
  } = await tmdb.movie.recommendations({
    id: params.id,
    page: searchParams.page,
  });

  if (!movies?.length) {
    return <div className="empty-box">No recommendations</div>;
  }

  return (
    <div className="space-y-4">
      <section className="grid-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </section>
      <ListPagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
