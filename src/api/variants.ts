import { executeGraphql } from "./graphqlApi";
import {
	type ProductListItemFragment,
	VariantsGetListDocument,
	VariantsGetColorDocument,
	VariantsGetSizeColorDocument,
} from "@/gql/graphql";

export const getVariantsList = async (
	_id: ProductListItemFragment["id"],
) => {
	const graphqlResponse = await executeGraphql(
		VariantsGetListDocument,
		{
			id: _id,
		},
	);

	return graphqlResponse.product?.variants[0]?.__typename ?? [];
};

export const getColorVariants = async (
	_id: ProductListItemFragment["id"],
) => {
	const graphqlResponse = await executeGraphql(
		VariantsGetColorDocument,
		{
			id: _id,
		},
	);

	return graphqlResponse.product?.variants;
};

export const getSizeColorVariants = async (
	_id: ProductListItemFragment["id"],
) => {
	const graphqlResponse = await executeGraphql(
		VariantsGetSizeColorDocument,
		{
			id: _id,
		},
	);

	return graphqlResponse.product?.variants;
};
