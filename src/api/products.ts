import { executeGraphql } from "./graphqlApi";
import {
	ProductGetByIdDocument,
	type ProductListItemFragment,
	ProductsGetByCategoryNameDocument,
	ProductsGetListDocument,
	ProductsGetTotalCountByCategoryNameDocument,
	ProductsGetTotalCountDocument,
} from "@/gql/graphql";

export const getProductsList = async (pageNumber: number) => {
	const productsPerPage = 4;
	const offset = (pageNumber - 1) * productsPerPage;
	const graphqlResponse = await executeGraphql(
		ProductsGetListDocument,
		{ productsPerPage: productsPerPage, offset: offset },
	);

	return graphqlResponse.products;
};

export const getProductsTotalCount = async () => {
	const graphqlResponse = await executeGraphql(
		ProductsGetTotalCountDocument,
		{},
	);
	return graphqlResponse.productsConnection.aggregate.count;
};

export const getProductById = async (
	_id: ProductListItemFragment["id"],
) => {
	const graphqlResponse = await executeGraphql(
		ProductGetByIdDocument,
		{
			id: _id,
		},
	);
	return graphqlResponse.product;
};

export const getProductsByCategoryName = async (
	categoryName: string,
	pageNumber: number,
) => {
	const productsPerPage = 4;
	const offset = (pageNumber - 1) * productsPerPage;
	const data = await executeGraphql(
		ProductsGetByCategoryNameDocument,
		{
			name: categoryName,
			productsPerPage: productsPerPage,
			offset: offset,
		},
	);
	return data.categories[0]?.products;
};

export const getProductsTotalCountByCategoryName = async (
	categoryName: string,
) => {
	const graphqlResponse = await executeGraphql(
		ProductsGetTotalCountByCategoryNameDocument,
		{ name: categoryName },
	);
	return graphqlResponse.productsConnection.aggregate.count;
};
