import { notFound } from "next/navigation";
import { SizeColorVariants } from "../molecules/SizeColorVariants";
import { ColorVariants } from "../molecules/ColorVaraints";
import {
	getColorVariants,
	getSizeColorVariants,
	getVariantsList,
} from "@/api/variants";
import { type ProductColor } from "@/gql/graphql";

type VariantsListProps = {
	productId: string;
};

type ColorVariantType = {
	id: string;
	name: string;
	color: ProductColor;
};

type SizeColorVariantType = {
	name: string;
	size: string;
	color: ProductColor;
};

export const VariantsList = async ({
	productId,
}: VariantsListProps) => {
	const variant = await getVariantsList(productId);
	if (!variant) {
		return notFound();
	}
	let colorVariants: ColorVariantType[] = [];
	if (variant === "ProductColorVariant") {
		colorVariants = (await getColorVariants(
			productId,
		)) as ColorVariantType[];
	}
	let sizeColorVariants: SizeColorVariantType[] = [];
	if (variant === "ProductSizeColorVariant") {
		sizeColorVariants = (await getSizeColorVariants(
			productId,
		)) as SizeColorVariantType[];
	}

	return (
		<>
			{variant === "ProductColorVariant" && (
				<ColorVariants colorVariants={colorVariants} />
			)}
			{variant === "ProductSizeColorVariant" && (
				<SizeColorVariants sizeColorVariants={sizeColorVariants} />
			)}
		</>
	);
};
