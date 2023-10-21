"use client";

import {
	experimental_useOptimistic as useOptimistic,
	useState,
} from "react";
import { addReviewAction } from "@/app/product/actions";
import { ReviewItemFragment } from "@/gql/graphql";
import { ReviewListItem } from "@/ui/molecules/ReviewListItem";
import { AddReviewButton } from "@/ui/atoms/AddReviewButton";
import { RatingStars } from "@/ui/molecules/RatingStars";

export const AddReview = ({
	productId,
	reviews,
}: {
	productId: string;
	reviews: ReviewItemFragment[];
}) => {
	const [rating, setRating] = useState(0);

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
	};
	const [optimisticReviews, setOptimisticReviews] =
		useOptimistic(reviews);

	async function addReview(formData: FormData) {
		const newReview: ReviewItemFragment = {
			id: productId,
			headline: String(formData.get("headline")),
			content: String(formData.get("content")),
			rating: Number(formData.get("rating")),
			name: String(formData.get("name")),
			email: String(formData.get("email")),
		};
		setOptimisticReviews([...optimisticReviews, newReview]);
		await addReviewAction(productId, formData);
	}
	return (
		<section className="my-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-40">
			<h2 className="text-2xl font-bold">Share your thoughts</h2>
			<p>
				If you have used this product, share your thoughts with other
				customers
			</p>

			<form data-testid="add-review-form" action={addReview}>
				<div className="mb-4">
					<label
						htmlFor="headline"
						className="mb-2 block font-bold text-gray-700"
					>
						Headline
					</label>
					<input
						type="text"
						id="headline"
						name="headline"
						className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="content"
						className="mb-2 block font-bold text-gray-700"
					>
						Content
					</label>
					<textarea
						id="content"
						name="content"
						className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
						rows={4}
						required
					></textarea>
				</div>
				<label
					htmlFor="rating"
					className="mb-2 block font-bold text-gray-700"
				>
					Rating
				</label>
				<RatingStars
					averageRating={rating}
					readOnly={false}
					onRatingChange={handleRatingChange}
				/>
				<input
					type="hidden"
					id="rating"
					name="rating"
					value={rating}
					required
				/>
				<div className="mb-4">
					<label
						htmlFor="name"
						className="mb-2 block font-bold text-gray-700"
					>
						Your Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="mb-2 block font-bold text-gray-700"
					>
						Your Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
						required
					/>
				</div>
				<AddReviewButton />
			</form>

			<ul className="flex flex-col">
				{optimisticReviews.map((review) => {
					return (
						<li key={review.id}>
							<ReviewListItem review={review} />
						</li>
					);
				})}
			</ul>
		</section>
	);
};
