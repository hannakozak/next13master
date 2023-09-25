import { type Metadata } from "next";
import { ProductList } from "@/ui/organisms/ProductList";
import {
	getProductsByCategoryName,
	getProductsTotalCountByCategoryName,
} from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { getCategoryByName } from "@/api/categories";

type CategoryProductPageProps = {
	params: { pageNumber: number; categoryName: string };
};

export const generateMetadata = async ({
	params,
}: CategoryProductPageProps): Promise<Metadata> => {
	const category = await getCategoryByName(params.categoryName);

	return {
		title: category?.name,
		openGraph: {
			title: category.name,
		},
	};
};

export default async function CategoryProductPage({
	params,
}: CategoryProductPageProps) {
	const products = await getProductsByCategoryName(
		params.categoryName,
		params.pageNumber,
	);
	const productsTotalCount =
		await getProductsTotalCountByCategoryName(params.categoryName);

	return (
		<>
			<h1 className="first-letter:uppercase">
				{params.categoryName}
			</h1>
			<ProductList products={products} />
			<Pagination
				currentPage={params.pageNumber}
				productsCount={productsTotalCount}
				path={`categories/${params.categoryName}`}
			/>
		</>
	);
}
