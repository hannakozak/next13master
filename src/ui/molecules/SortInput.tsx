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
			label: "Price Ascending",
			value: "price_ASC",
			testid: "sort-by-price",
		},
		{
			label: "Price Descending",
			value: "price_DESC",
			testid: "sort-by-price",
		},
		{
			label: "Rating Ascending",
			value: "averageRating_ASC",
			testid: "sort-by-rating",
		},
		{
			label: "Rating Descending",
			value: "averageRating_DESC",
			testid: "sort-by-rating",
		},
	];

	return (
		<>
			<fieldset className="my-6">
				<legend className="font-semibold text-gray-600">
					Order By: &nbsp;
					<select
						className="px-5 font-semibold transition duration-300 ease-in-out hover:text-amber-600 focus:text-amber-800 active:text-amber-800"
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
				</legend>
			</fieldset>
		</>
	);
};
