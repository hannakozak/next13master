import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
import {
	CollectionsGetBySlugDocument,
	CollectionsGetListDocument,
	CollectionsGetProductsByCollectionSlugDocument,
	CollectionsGetProductsTotalCountByCollectionSlugDocument,
} from "@/gql/graphql";
import { type ProductItemType } from "@/ui/types";

type CollectionsItemType = {
	id: string;
	name: string;
	slug: string;
};
export const getCollectionsList = async (): Promise<
	CollectionsItemType[]
> => {
	const graphqlResponse = await executeGraphql(
		CollectionsGetListDocument,
		{},
	);
	const collections = graphqlResponse.collections;
	if (!collections) {
		notFound();
	}
	return collections;
};

export const getCollectionBySlug = async (
	collectionSlug: string,
): Promise<CollectionsItemType> => {
	const graphqlResponse = await executeGraphql(
		CollectionsGetBySlugDocument,
		{ slug: collectionSlug },
	);
	const collection = graphqlResponse.collections[0];
	if (!collection) {
		notFound();
	}
	return collection;
};

export const getProductsTotalCountByCollectionSlug = async (
	collectionSlug: string,
): Promise<number> => {
	const graphqlResponse = await executeGraphql(
		CollectionsGetProductsTotalCountByCollectionSlugDocument,
		{ slug: collectionSlug },
	);
	return graphqlResponse.productsConnection.aggregate.count;
};

export const getProductsByCollectionSlug = async (
	collectionSlug: string,
	pageNumber: number,
): Promise<ProductItemType[]> => {
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
	const products = graphqlResponse.collections[0]?.products;

	if (!products) {
		notFound();
	}

	return products.map((product) => {
		return {
			id: product.id,
			category: product.categories[0]?.name || "",
			name: product.name,
			price: product.price,
			description: product.description,
			coverImage: product.images[0] && {
				src: product.images[0].url,
				alt: product.name,
			},
		};
	});
};
