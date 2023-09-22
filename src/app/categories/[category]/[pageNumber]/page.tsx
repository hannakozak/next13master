import { notFound } from "next/navigation";
import { ProductList } from "@/ui/organisms/ProductList";
import {
	getProductsByCategorySlugAndPage,
	getProductsByCategorySlugCount,
} from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";

export default async function CategoryProductPage({
	params,
}: {
	params: { pageNumber: number; category: string };
}) {
	const productsCount = await getProductsByCategorySlugCount(
		params.category,
	);
	const products = await getProductsByCategorySlugAndPage(
		params.pageNumber,
		params.category,
	);

	if (!products) {
		throw notFound();
	}

	if (!productsCount) {
		throw notFound();
	}

	return (
		<>
			<ProductList products={products} />
			<Pagination
				currentPage={params.pageNumber}
				productsCount={productsCount}
				path={`categories/${params.category}`}
			/>
		</>
	);
}
