import { type Metadata } from "next";
import { notFound } from "next/navigation";
import {
	getCollectionBySlug,
	getProductsByCollectionSlug,
	getProductsTotalCountByCollectionSlug,
} from "@/api/collections";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductList } from "@/ui/organisms/ProductList";
import { SortInput } from "@/ui/molecules/SortInput";
import { ProductOrderByInput } from "@/gql/graphql";

type CollectionProductPageProps = {
	params: { pageNumber: number; collectionSlug: string };
	searchParams: { sort: ProductOrderByInput };
};

export const generateMetadata = async ({
	params,
}: CollectionProductPageProps): Promise<Metadata> => {
	const collection = await getCollectionBySlug(params.collectionSlug);
	return {
		title: collection?.name,
		openGraph: {
			title: collection?.name,
		},
	};
};
export default async function CollectionProductPage({
	params,
	searchParams,
}: CollectionProductPageProps) {
	const collection = await getCollectionBySlug(params.collectionSlug);
	if (!collection) {
		notFound();
	}
	const products = await getProductsByCollectionSlug(
		params.collectionSlug,
		params.pageNumber,
		searchParams.sort,
	);
	if (!products) {
		notFound();
	}
	const productsTotalCount =
		await getProductsTotalCountByCollectionSlug(
			params.collectionSlug,
		);

	return (
		<>
			<SortInput />
			<ProductList products={products} />
			<Pagination
				currentPage={params.pageNumber}
				productsCount={productsTotalCount}
				path={`collections/${params.collectionSlug}`}
			/>
		</>
	);
}
