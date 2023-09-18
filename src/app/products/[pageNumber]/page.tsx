import { ProductList } from "@/ui/organisms/ProductList";
import {
	getProductListByPage,
	getProductsList,
} from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";

export const generateStaticParams = async () => {
	await getProductsList();
	const numberGeneretedPages = 5;

	return Array.from({ length: numberGeneretedPages }, (_, index) => ({
		pageNumber: (index + 1).toString(),
	}));
};

export default async function Products({
	params,
}: {
	params: { pageNumber: number };
}) {
	const products = await getProductListByPage(params.pageNumber);

	return (
		<>
			<ProductList products={products} />
			<Pagination currentPage={params.pageNumber} />
		</>
	);
}
