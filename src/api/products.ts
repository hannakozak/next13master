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

export const getProductsList = async () => {
	const take = 40;
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${take}`,
	);
	const productsResponse =
		(await res.json()) as ProductResponseItem[];
	const products = productsResponse.map(
		productResponseItemToProductItemType,
	);
	return products;
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

export const getProductListByPage = async (pageNumber: number) => {
	const take = 4;
	const offset = (pageNumber - 1) * take;
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${take}&offset=${offset}`,
	);
	const productsResponse =
		(await res.json()) as ProductResponseItem[];
	return productsResponse.map(productResponseItemToProductItemType);
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
