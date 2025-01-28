import type { SimpleIdParams } from "@/types/params";
import type { SearchReviewTypeParams } from "@/types/search";
import { tmdb } from "@/lib/tmdb/api";
import { ListPagination } from "@/components/composite/list";
import { UserReviewCard } from "@/components/composite/user";

interface DetailReviewsProps {
  params: SimpleIdParams;
  searchParams: SearchReviewTypeParams;
}

export async function generateMetadata(props: DetailReviewsProps) {
  const params = await props.params;
  const { name } = await tmdb.tv.detail({
    id: params.id,
  });

  return {
    title: `Reviews - ${name}`,
  };
}
export default async function DetailReviews(props: DetailReviewsProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { results, page, total_pages } = await tmdb.tv.reviews({
    id: params.id,
    page: searchParams.page,
  });

  if (!results.length) return <div className="empty-box">No reviews</div>;

  return (
    <section className="space-y-8">
      {results.map((review) => (
        <UserReviewCard key={review.id} review={review} />
      ))}

      <ListPagination currentPage={page} totalPages={total_pages} />
    </section>
  );
}
