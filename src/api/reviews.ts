import {
	ProductListItemFragment,
	ReviewCreateDocument,
	ReviewGetByProductIdDocument,
	ReviewItemFragment,
	ReviewPublishDocument,
} from "@/gql/graphql";
import { executeGraphql } from "./graphqlApi";

export const getReviewsByProductId = async (
	_id: ProductListItemFragment["id"],
) => {
	const graphqlResponse = await executeGraphql({
		query: ReviewGetByProductIdDocument,
		variables: {
			id: _id,
		},
		next: {
			revalidate: 1,
		},
	});
	return graphqlResponse.reviewsConnection.edges.map(
		(edge) => edge.node,
	);
};

export async function createReview(review: ReviewItemFragment) {
	const reviewId = await executeGraphql({
		query: ReviewCreateDocument,
		variables: { ...review },
		next: {},
		cache: "no-cache",
	});

	return reviewId;
}

export async function publishReview(reviewId: string) {
	await executeGraphql({
		query: ReviewPublishDocument,
		variables: { id: reviewId },
		next: {},
		cache: "no-cache",
	});
}
