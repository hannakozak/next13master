import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProductById } from "@/api/products";
import { Product } from "@/ui/organisms/Product";
import { type ProductListItemFragment } from "@/gql/graphql";
import { SuggestedProducts } from "@/ui/organisms/SuggesedProducts";
import { getReviewsByProductId } from "@/api/reviews";
import { AddReview } from "../AddReview";

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

	const reviews = await getReviewsByProductId(params.productId);

	const category = product?.categories[0]
		? product.categories[0].name
		: "";

	return (
		<>
			<Product product={product} />
			<aside data-testid="related-products">
				<Suspense>
					<SuggestedProducts category={category} />
				</Suspense>
			</aside>
			<aside>
				<AddReview reviews={reviews} productId={params.productId} />
			</aside>
		</>
	);
}
