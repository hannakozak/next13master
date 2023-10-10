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
	params: { pageNumber: number; categoryName: string };
	searchParams: { sort: ProductOrderByInput };
};

export const generateMetadata = async ({
	params,
}: CategoryProductPageProps): Promise<Metadata> => {
	const category = await getCategoryByName(params.categoryName);

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
		params.categoryName,
		params.pageNumber,
		searchParams.sort,
	);
	if (!products) {
		notFound();
	}
	const productsTotalCount =
		await getProductsTotalCountByCategoryName(params.categoryName);

	return (
		<>
			<h1 className="first-letter:uppercase">
				{params.categoryName}
			</h1>
			<SortInput />
			<ProductList products={products} />
			<Pagination
				currentPage={params.pageNumber}
				productsCount={productsTotalCount}
				path={`categories/${params.categoryName}`}
			/>
		</>
	);
}
