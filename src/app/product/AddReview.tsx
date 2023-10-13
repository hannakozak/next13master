"use client";
import { experimental_useOptimistic as useOptimistic } from "react";

import { addReviewAction } from "@/app/product/actions";
import { useRouter } from "next/navigation";
import { ReviewItemFragment } from "@/gql/graphql";
import { ReviewListItem } from "@/ui/molecules/ReviewListItem";

export const AddReview = ({
	productId,
	reviews,
}: {
	productId: string;
	reviews: ReviewItemFragment[];
}) => {
	const router = useRouter();
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
		router.refresh();
	}
	return (
		<section className="my-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-40">
			<h2 className="text-2xl font-bold">Share your thoughts</h2>
			<p>
				If you have used this product, share your thoughts with other
				customers
			</p>

			<form data-testid="add-review-form">
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
				<div className="mb-4">
					<label
						htmlFor="rating"
						className="mb-2 block font-bold text-gray-700"
					>
						Rating
					</label>
					<select
						id="rating"
						name="rating"
						className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
						required
					>
						<option value="5">5 Stars</option>
						<option value="4">4 Stars</option>
						<option value="3">3 Stars</option>
						<option value="2">2 Stars</option>
						<option value="1">1 Star</option>
					</select>
				</div>
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
				<button
					formAction={addReview}
					type="submit"
					data-testid="add-review-button"
					className="brighness-100 font-semiboldbold h-14 w-full rounded-md bg-gradient-to-r from-blue-500  via-blue-800 to-blue-950 text-xl text-white shadow-md hover:brightness-125 disabled:cursor-wait disabled:brightness-50"
				>
					Add Review
				</button>
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
