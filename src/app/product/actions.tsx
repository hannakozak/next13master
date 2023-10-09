"use server";

import { createReview, publishReview } from "@/api/reviews";
import { ReviewItemFragment } from "@/gql/graphql";

export const addReviewAction = async (
	productId: string,
	formData: FormData,
) => {
	const reviewForm: ReviewItemFragment = {
		id: productId,
		headline: String(formData.get("headline")),
		content: String(formData.get("content")),
		rating: Number(formData.get("rating")),
		name: String(formData.get("name")),
		email: String(formData.get("email")),
	};

	const { createReview: reviewId } = await createReview(reviewForm);

	if (!reviewId) {
		throw TypeError(
			"Something went wrong during the review creation!",
		);
	}

	await publishReview(reviewId.id);
};
