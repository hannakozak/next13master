import { ProductList } from "@/ui/organisms/ProductList";
import {
	getProductsList,
	getProductsTotalCount,
} from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";

type ProductsPageProps = {
	params: { pageNumber: number };
};

export const generateStaticParams = async ({
	params,
}: ProductsPageProps) => {
	await getProductsList(params.pageNumber);
	const productsTotalCount = await getProductsTotalCount();

	const productsPerPage = 4;

	const numberGeneretedPages = Math.ceil(
		productsTotalCount / productsPerPage,
	);

	return Array.from({ length: numberGeneretedPages }, (_, index) => ({
		pageNumber: (index + 1).toString(),
	}));
};

export default async function Products({
	params,
}: ProductsPageProps) {
	const products = await getProductsList(params.pageNumber);
	const productsTotalCount = await getProductsTotalCount();

	return (
		<>
			<ProductList products={products} />
			<Pagination
				currentPage={params.pageNumber}
				productsCount={productsTotalCount}
				path="products"
			/>
		</>
	);
}
