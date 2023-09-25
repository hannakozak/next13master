import { type Metadata } from "next";
import {
	getCollectionBySlug,
	getProductsByCollectionSlug,
	getProductsTotalCountByCollectionSlug,
} from "@/api/collections";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";

type CollectionProductPageProps = {
	params: { pageNumber: number; collectionSlug: string };
};

export const generateMetadata = async ({
	params,
}: CollectionProductPageProps): Promise<Metadata> => {
	const collection = await getCollectionBySlug(params.collectionSlug);
	return {
		title: collection?.name,
		openGraph: {
			title: collection.name,
		},
	};
};
export default async function CollectionProductPage({
	params,
}: CollectionProductPageProps) {
	const collection = await getCollectionBySlug(params.collectionSlug);
	const products = await getProductsByCollectionSlug(
		params.collectionSlug,
		params.pageNumber,
	);
	const productsTotalCount =
		await getProductsTotalCountByCollectionSlug(
			params.collectionSlug,
		);

	return (
		<>
			<h1>{collection.name}</h1>
			<ProductList products={products} />
			<Pagination
				currentPage={params.pageNumber}
				productsCount={productsTotalCount}
				path={`collections/${params.collectionSlug}`}
			/>
		</>
	);
}
