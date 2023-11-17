import { executeGraphql } from "./graphqlApi";
import {
	CollectionsGetBySlugDocument,
	CollectionsGetListDocument,
	CollectionsGetProductsByCollectionSlugDocument,
	CollectionsGetProductsTotalCountByCollectionSlugDocument,
} from "@/gql/graphql";
import { ProductOrderByInput } from "@/gql/graphql";

export const getCollectionsList = async () => {
	const graphqlResponse = await executeGraphql({
		query: CollectionsGetListDocument,
		variables: {},
		next: {
			revalidate: 1,
		},
	});
	return graphqlResponse.collections;
};

export const getCollectionBySlug = async (collectionSlug: string) => {
	const graphqlResponse = await executeGraphql({
		query: CollectionsGetBySlugDocument,
		variables: { slug: collectionSlug },
	});
	return graphqlResponse.collections[0];
};

export const getProductsTotalCountByCollectionSlug = async (
	collectionSlug: string,
) => {
	const graphqlResponse = await executeGraphql({
		query: CollectionsGetProductsTotalCountByCollectionSlugDocument,
		variables: { slug: collectionSlug },
	});
	return graphqlResponse.productsConnection.aggregate.count;
};

export const getProductsByCollectionSlug = async (
	collectionSlug: string,
	pageNumber: number,
	_orderBy: ProductOrderByInput,
) => {
	const productsPerPage = 4;
	const offset = (pageNumber - 1) * productsPerPage;
	const graphqlResponse = await executeGraphql({
		query: CollectionsGetProductsByCollectionSlugDocument,
		variables: {
			slug: collectionSlug,
			productsPerPage: productsPerPage,
			offset: offset,
			orderBy: _orderBy,
		},
	});
	return graphqlResponse.collections[0]?.products;
};
