import { executeGraphql } from "./graphqlApi";
import {
	ProductGetByIdDocument,
	type ProductListItemFragment,
	ProductsGetByCategoryNameDocument,
	ProductsGetListDocument,
	ProductsGetTotalCountByCategoryNameDocument,
	ProductsGetTotalCountDocument,
	ProductsGetListBySearchQueryDocument,
	ProductOrderByInput,
} from "@/gql/graphql";

export const getProductsList = async (
	pageNumber: number = 1,
	_orderBy: ProductOrderByInput = "createdAt_ASC",
) => {
	const productsPerPage = 4;
	const offset = (pageNumber - 1) * productsPerPage;
	const graphqlResponse = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {
			orderBy: _orderBy,
			productsPerPage: productsPerPage,
			offset: offset,
		},
		next: {
			revalidate: 1,
		},
	});

	return graphqlResponse.products;
};

export const getProductsTotalCount = async () => {
	const graphqlResponse = await executeGraphql({
		query: ProductsGetTotalCountDocument,
		variables: {},
	});
	return graphqlResponse.productsConnection.aggregate.count;
};

export const getProductById = async (
	id: ProductListItemFragment["id"],
) => {
	const graphqlResponse = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: {
			id: id,
		},
	});
	return graphqlResponse.product;
};

export const getProductsByCategoryName = async (
	categoryName: string,
	pageNumber: number = 1,
	_orderBy: ProductOrderByInput = "createdAt_ASC",
) => {
	const productsPerPage = 4;
	const offset = (pageNumber - 1) * productsPerPage;
	const data = await executeGraphql({
		query: ProductsGetByCategoryNameDocument,
		variables: {
			name: categoryName,
			productsPerPage: productsPerPage,
			offset: offset,
			orderBy: _orderBy,
		},
	});
	return data.categories[0]?.products;
};

export const getProductsTotalCountByCategoryName = async (
	categoryName: string,
) => {
	const graphqlResponse = await executeGraphql({
		query: ProductsGetTotalCountByCategoryNameDocument,
		variables: { name: categoryName },
	});
	return graphqlResponse.productsConnection.aggregate.count;
};

export const getProductsListBySearchQuery = async (
	_search: string,
) => {
	const graphqlResponse = await executeGraphql({
		query: ProductsGetListBySearchQueryDocument,
		variables: { search: _search },
	});
	return graphqlResponse.products;
};
