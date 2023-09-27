import { executeGraphql } from "./graphqlApi";
import {
	CollectionsGetBySlugDocument,
	CollectionsGetListDocument,
	CollectionsGetProductsByCollectionSlugDocument,
	CollectionsGetProductsTotalCountByCollectionSlugDocument,
} from "@/gql/graphql";

export const getCollectionsList = async () => {
	const graphqlResponse = await executeGraphql(
		CollectionsGetListDocument,
		{},
	);
	return graphqlResponse.collections;
};

export const getCollectionBySlug = async (collectionSlug: string) => {
	const graphqlResponse = await executeGraphql(
		CollectionsGetBySlugDocument,
		{ slug: collectionSlug },
	);
	return graphqlResponse.collections[0];
};

export const getProductsTotalCountByCollectionSlug = async (
	collectionSlug: string,
) => {
	const graphqlResponse = await executeGraphql(
		CollectionsGetProductsTotalCountByCollectionSlugDocument,
		{ slug: collectionSlug },
	);
	return graphqlResponse.productsConnection.aggregate.count;
};

export const getProductsByCollectionSlug = async (
	collectionSlug: string,
	pageNumber: number,
) => {
	const productsPerPage = 4;
	const offset = (pageNumber - 1) * productsPerPage;
	const graphqlResponse = await executeGraphql(
		CollectionsGetProductsByCollectionSlugDocument,
		{
			slug: collectionSlug,
			productsPerPage: productsPerPage,
			offset: offset,
		},
	);
	return graphqlResponse.collections[0]?.products;
};
