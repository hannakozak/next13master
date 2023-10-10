import { ProductList } from "@/ui/organisms/ProductList";
import {
	getProductsList,
	getProductsTotalCount,
} from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { ProductOrderByInput } from "@/gql/graphql";
import { SortInput } from "@/ui/molecules/SortInput";

type ProductsPageProps = {
	params: { pageNumber: number };
	searchParams: { sort: ProductOrderByInput };
};

/*export const generateStaticParams = async () => {
	const productsTotalCount = await getProductsTotalCount();
	const productsPerPage = 4;
	const numberGeneretedPages = Math.ceil(
		productsTotalCount / productsPerPage,
	);

	return Array.from({ length: numberGeneretedPages }, (_, index) => ({
		pageNumber: (index + 1).toString(),
	}));
};*/

export default async function Products({
	params,
	searchParams,
}: ProductsPageProps) {
	const products = await getProductsList(
		params.pageNumber,
		searchParams.sort,
	);
	const productsTotalCount = await getProductsTotalCount();

	return (
		<>
			<SortInput />
			<ProductList products={products} />
			<Pagination
				currentPage={params.pageNumber}
				productsCount={productsTotalCount}
				path="products"
			/>
		</>
	);
}
