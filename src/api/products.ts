import { executeGraphql } from "./graphqlApi";
import { ProductsGetListDocument } from "@/gql/graphql";
import { type ProductItemType } from "@/ui/types";

type ProductResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
};

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

export const getProductById = async (
	id: ProductResponseItem["id"],
) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products/${id}`,
	);
	const productResponse = (await res.json()) as ProductResponseItem;
	return productResponseItemToProductItemType(productResponse);
};

const productResponseItemToProductItemType = (
	product: ProductResponseItem,
): ProductItemType => {
	return {
		id: product.id,
		name: product.title,
		category: product.category,
		price: product.price,
		description: product.description,
		coverImage: {
			alt: product.title,
			src: product.image,
		},
	};
};
