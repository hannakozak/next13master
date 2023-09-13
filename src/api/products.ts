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
	const take = 20;
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${take}`,
	);
	const productsResponse =
		(await res.json()) as ProductResponseItem[];
	const products = productsResponse.map(
		(product): ProductItemType => ({
			id: product.id,
			name: product.title,
			category: product.category,
			price: product.price,
			coverImage: {
				alt: product.title,
				src: product.image,
			},
		}),
	);
	return products;
};
