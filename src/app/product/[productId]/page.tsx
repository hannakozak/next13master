import { type Metadata } from "next";
import { getProductById } from "@/api/products";
import { Product } from "@/ui/organisms/Product";

export const generateMetadata = async ({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> => {
	const product = await getProductById(params.productId);
	return {
		title: `${product.name} - Next.js Shop`,
		description: product.description,
		openGraph: {
			title: `${product.name} - Next.js Shop`,
			description: product.description,
			images: [product.coverImage.src],
		},
	};
};

export default async function SingleProductPage({
	params,
}: {
	params: { productId: string };
}) {
	const product = await getProductById(params.productId);
	return <Product product={product} />;
}
