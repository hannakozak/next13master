import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
import {
	ProductGetByIdDocument,
	ProductsGetByCategoryNameDocument,
	ProductsGetListDocument,
	ProductsGetTotalCountByCategoryNameDocument,
	ProductsGetTotalCountDocument,
} from "@/gql/graphql";
import { type ProductItemType } from "@/ui/types";

export const getProductsList = async (
	pageNumber: number,
): Promise<ProductItemType[]> => {
	const productsPerPage = 4;
	const offset = (pageNumber - 1) * productsPerPage;
	const graphqlResponse = await executeGraphql(
		ProductsGetListDocument,
		{ productsPerPage: productsPerPage, offset: offset },
	);

	return graphqlResponse.products.map((product) => {
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

export const getProductsTotalCount = async (): Promise<number> => {
	const graphqlResponse = await executeGraphql(
		ProductsGetTotalCountDocument,
		{},
	);
	return graphqlResponse.productsConnection.aggregate.count;
};

export const getProductById = async (
	id: string,
): Promise<ProductItemType> => {
	const graphqlResponse = await executeGraphql(
		ProductGetByIdDocument,
		{ id: id },
	);
	const product = graphqlResponse.product;

	if (!product) {
		notFound();
	}

	return {
		id: product.id,
		category: product.categories?.[0]?.name || "",
		name: product.name,
		price: product.price,
		description: product.description,
		coverImage: product.images?.[0] && {
			src: product.images[0]?.url,
			alt: product.name,
		},
	};
};

export const getProductsByCategoryName = async (
	categoryName: string,
	pageNumber: number,
): Promise<ProductItemType[]> => {
	const productsPerPage = 4;
	const offset = (pageNumber - 1) * productsPerPage;
	const categories = await executeGraphql(
		ProductsGetByCategoryNameDocument,
		{
			name: categoryName,
			productsPerPage: productsPerPage,
			offset: offset,
		},
	);
	const products = categories.categories[0]?.products;
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

export const getProductsTotalCountByCategoryName = async (
	categoryName: string,
): Promise<number> => {
	const graphqlResponse = await executeGraphql(
		ProductsGetTotalCountByCategoryNameDocument,
		{ name: categoryName },
	);
	return graphqlResponse.productsConnection.aggregate.count;
};
