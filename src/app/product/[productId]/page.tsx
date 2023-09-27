import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById } from "@/api/products";
import { Product } from "@/ui/organisms/Product";
import { type ProductListItemFragment } from "@/gql/graphql";

type SingleProductPageProps = {
	params: { productId: ProductListItemFragment["id"] };
};

export const generateMetadata = async ({
	params,
}: SingleProductPageProps): Promise<Metadata> => {
	const product = await getProductById(params.productId);

	const images = product?.images[0] ? [product.images[0].url] : [];
	return {
		title: product?.name,
		description: product?.description,
		openGraph: {
			title: product?.name,
			description: product?.description,
			images: images,
		},
	};
};

export default async function SingleProductPage({
	params,
}: SingleProductPageProps) {
	const product = await getProductById(params.productId);
	if (!product) {
		return notFound();
	}
	return <Product product={product} />;
}
