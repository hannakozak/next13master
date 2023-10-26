import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductList } from "@/ui/organisms/ProductList";
import {
	getProductsByCategoryName,
	getProductsTotalCountByCategoryName,
} from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { getCategoryByName } from "@/api/categories";
import { SortInput } from "@/ui/molecules/SortInput";
import { ProductOrderByInput } from "@/gql/graphql";

type CategoryProductPageProps = {
	params: { pageNumber: number; categorySlug: string };
	searchParams: { sort: ProductOrderByInput };
};

export const generateMetadata = async ({
	params,
}: CategoryProductPageProps): Promise<Metadata> => {
	const category = await getCategoryByName(params.categorySlug);

	return {
		title: category?.name,
		openGraph: {
			title: category?.name,
		},
	};
};

export default async function CategoryProductPage({
	params,
	searchParams,
}: CategoryProductPageProps) {
	const products = await getProductsByCategoryName(
		params.categorySlug,
		params.pageNumber,
		searchParams.sort,
	);
	if (!products) {
		notFound();
	}
	const productsTotalCount =
		await getProductsTotalCountByCategoryName(params.categorySlug);

	return (
		<>
			<SortInput />
			<ProductList products={products} />
			<Pagination
				currentPage={params.pageNumber}
				productsCount={productsTotalCount}
				path={`categories/${params.categorySlug}`}
			/>
		</>
	);
}
