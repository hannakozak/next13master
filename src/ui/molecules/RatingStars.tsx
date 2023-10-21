import { Star } from "lucide-react";

type RatingStarsProps = {
	averageRating: number;
	readOnly?: boolean;
	onRatingChange?: (rating: number) => void;
};

export const RatingStars = ({
	averageRating = 0,
	readOnly,
	onRatingChange,
}: RatingStarsProps) => {
	const handleStarClick = (newRating: number) => {
		if (!readOnly && onRatingChange) {
			onRatingChange(newRating);
		}
	};

	return (
		<div className="flex items-center">
			<p className="mr-3 text-sm text-slate-500">
				{averageRating} / 5
			</p>
			{Array.from({ length: 5 }, (_, i) => (
				<Star
					key={i}
					className={`h-5 w-5 cursor-pointer fill-current ${
						i < averageRating ? "text-yellow-400" : "text-gray-300"
					}`}
					onClick={() => handleStarClick(i + 1)}
				/>
			))}
		</div>
	);
};
