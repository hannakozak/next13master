"use client";

import { type ProductItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";
import { RatingStars } from "./RatingStars";

type ProductDescriptionProps = {
	product: ProductItemFragment;
};

export const ProductDescription = ({
	product: { name, price, description, averageRating },
}: ProductDescriptionProps) => {
	return (
		<div className="flex flex-col gap-8">
			<h1 className="text-center text-2xl font-semibold text-gray-800">
				{name}
			</h1>
			<p className="text-xl font-bold text-gray-800">
				<span className="sr-only">Cena:</span>
				{formatMoney(price / 100)}
			</p>

			{averageRating && (
				<RatingStars averageRating={averageRating} readOnly={true} />
			)}
			<p className="prose text-sm">{description}</p>
		</div>
	);
};
