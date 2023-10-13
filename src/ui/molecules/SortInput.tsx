"use client";

import { Route } from "next";
import {
	usePathname,
	useSearchParams,
	useRouter,
} from "next/navigation";
import { ProductOrderByInput } from "@/gql/graphql";

export const SortInput = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	type SortType = {
		label: string;
		value: ProductOrderByInput;
		testid: string;
	};
	const sortTypes: SortType[] = [
		{
			label: "PriceAsc.",
			value: "price_ASC",
			testid: "sort-by-price",
		},
		{
			label: "PriceDesc.",
			value: "price_DESC",
			testid: "sort-by-price",
		},
		{
			label: "RatingAsc.",
			value: "averageRating_ASC",
			testid: "sort-by-rating",
		},
		{
			label: "RatingDesc.",
			value: "averageRating_DESC",
			testid: "sort-by-rating",
		},
	];

	return (
		<>
			<fieldset>
				<legend>Order By</legend>
				<select
					name="sort-by"
					id="sort-by-id"
					value={searchParams.get("sort") || "Sort by"}
					onChange={(event) =>
						router.push(
							`${pathname}?sort=${event.target.value}` as Route,
						)
					}
				>
					{sortTypes.map(({ label, value, testid }) => (
						<option key={value} value={value} data-testid={testid}>
							{label}
						</option>
					))}
				</select>
			</fieldset>
		</>
	);
};
