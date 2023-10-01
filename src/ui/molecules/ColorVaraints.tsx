"use client";
import {
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation";
import { type Route } from "next";

import { type ProductColor } from "@/gql/graphql";

type ColorVariantProps = {
	colorVariants: ColorVariantType[];
};

type ColorVariantType = {
	id: string;
	name: string;
	color: ProductColor;
};

export const ColorVariants = ({
	colorVariants,
}: ColorVariantProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<>
			<p>Available Colors:</p>
			<div className="flex flex-row gap-3">
				{colorVariants.map((colorVariant) => {
					const typedColorVariant = colorVariant;

					const variantColor = typedColorVariant.color;
					return (
						<div key={typedColorVariant.id}>
							<button
								className="rounded, h-8 w-8"
								value={searchParams.get(variantColor) || variantColor}
								style={{ backgroundColor: variantColor }}
								onClick={(event) =>
									router.push(
										`${pathname}?color=${event.currentTarget.value}`.toString() as Route,
									)
								}
							></button>
						</div>
					);
				})}
			</div>
		</>
	);
};
