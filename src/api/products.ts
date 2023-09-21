import { executeGraphql } from "./graphqlApi";
import {
	ProductGetByIdDocument,
	ProductsGetListDocument,
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

export const getProductById = async (id: string) => {
	const graphqlResponse = await executeGraphql(
		ProductGetByIdDocument,
		{ id: id },
	);
	const product = graphqlResponse.product;

	if (!product) {
		throw new TypeError(`Product with id ${id} not found`);
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
