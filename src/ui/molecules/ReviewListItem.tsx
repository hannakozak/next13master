import { ReviewItemFragment } from "@/gql/graphql";

export const ReviewListItem = ({
	review,
}: {
	review: ReviewItemFragment;
}) => {
	return (
		<>
			{review.name}
			<p>{review.rating}</p>
		</>
	);
};
