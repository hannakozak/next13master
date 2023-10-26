import { ReviewItemFragment } from "@/gql/graphql";
import { RatingStars } from "./RatingStars";

export const ReviewListItem = ({
	review,
}: {
	review: ReviewItemFragment;
}) => {
	return (
		<>
			<h2>{review.headline}</h2>
			<h4>{review.name}</h4>
			<RatingStars averageRating={review.rating} readOnly />
			<p className="italic">{review.content}</p>
		</>
	);
};
