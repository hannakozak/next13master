import { notFound } from "next/navigation";
import { getProductsListBySearchQuery } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function SearchPage({
	searchParams,
}: {
	searchParams: {
		query: string;
	};
}) {
	const query = searchParams.query || "";
	const products = await getProductsListBySearchQuery(query);
	if (!products) {
		return notFound();
	}
	return (
		<>
			<ProductList products={products} />
		</>
	);
}
