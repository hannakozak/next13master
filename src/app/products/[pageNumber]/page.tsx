import { ProductList } from "@/ui/organisms/ProductList";
import { getProductListByPage } from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";

export default async function Products({
	params,
}: {
	params: { pageNumber: number };
}) {
	const products = await getProductListByPage(params.pageNumber);
	if (!products) {
		return <div>404</div>;
	}

	return (
		<>
			<ProductList products={products} />
			<Pagination currentPage={params.pageNumber} />
		</>
	);
}
