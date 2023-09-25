import { type Metadata } from "next";
import { getProductById } from "@/api/products";
import { Product } from "@/ui/organisms/Product";

type SingleProductPageProps = {
	params: { productId: string };
};

export const generateMetadata = async ({
	params,
}: SingleProductPageProps): Promise<Metadata> => {
	const product = await getProductById(params.productId);

	const images = product.coverImage ? [product.coverImage.src] : [];
	return {
		title: `${product.name}`,
		description: product.description,
		openGraph: {
			title: product.name,
			description: product.description,
			images: images,
		},
	};
};

export default async function SingleProductPage({
	params,
}: SingleProductPageProps) {
	const product = await getProductById(params.productId);
	return <Product product={product} />;
}
