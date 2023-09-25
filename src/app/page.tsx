import { getProductsList } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function Home() {
	const products = await getProductsList(1);
	return (
		<>
			<h1>Home</h1>
			<ProductList products={products} />
		</>
	);
}
