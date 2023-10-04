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
	const graphqlResponse = await executeGraphql({
		query: VariantsGetListDocument,
		variables: {
			id: _id,
		},
	});

	return graphqlResponse.product?.variants[0]?.__typename ?? [];
};

export const getColorVariants = async (
	_id: ProductListItemFragment["id"],
) => {
	const graphqlResponse = await executeGraphql({
		query: VariantsGetColorDocument,
		variables: {
			id: _id,
		},
	});

	return graphqlResponse.product?.variants;
};

export const getSizeColorVariants = async (
	_id: ProductListItemFragment["id"],
) => {
	const graphqlResponse = await executeGraphql({
		query: VariantsGetSizeColorDocument,
		variables: {
			id: _id,
		},
	});

	return graphqlResponse.product?.variants;
};
