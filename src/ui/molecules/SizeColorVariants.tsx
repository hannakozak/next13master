"use client";
import {
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation";
import { type Route } from "next";
import { type ProductColor } from "@/gql/graphql";

type SizeColorVariantType = {
	name: string;
	size: string;
	color: ProductColor;
};

type SizeColorVariantProps = {
	sizeColorVariants: SizeColorVariantType[];
};
export const SizeColorVariants = ({
	sizeColorVariants,
}: SizeColorVariantProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const groupedSizesByColor = sizeColorVariants.reduce(
		(result: { [key in ProductColor]?: string[] }, item) => {
			const { color, size } = item;

			if (!result[color]) {
				result[color] = [];
			}

			result[color]!.push(size);

			return result;
		},
		{},
	);

	return (
		<>
			{Object.entries(groupedSizesByColor).map(([color, sizes]) => {
				return (
					<div key={color} className="flex flex-row gap-3 py-3">
						<button
							className="rounded, h-8 w-8"
							value={searchParams.get(color) || color}
							style={{ backgroundColor: color }}
						></button>
						<select
							onClick={(event) =>
								router.push(
									`${pathname}?color=${color}?size=${event.currentTarget.value}`.toString() as Route,
								)
							}
						>
							{sizes.map((name) => (
								<option key={name} className="border-blue-900">
									{name}
								</option>
							))}
						</select>
					</div>
				);
			})}
		</>
	);
};
