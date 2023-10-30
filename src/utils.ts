import { Review } from './types/review';

function sortReviews(reviewA: Review, reviewB: Review): number {
  const reviewDateA = new Date(reviewA.createAt);
  const reviewDateB = new Date(reviewB.createAt);
  return reviewDateB.getTime() - reviewDateA.getTime();
}

export { sortReviews };
