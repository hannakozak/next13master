import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsList } from "@/api/products";

export default async function Products() {
	const products = await getProductsList();
	return <ProductList products={products} />;
}
