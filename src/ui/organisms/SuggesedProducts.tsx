import { notFound } from "next/navigation";
import { ProductList } from "./ProductList";
import { getProductsByCategoryName } from "@/api/products";

type SuggestedProductsProps = {
	category: string;
};

const wait = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));
export const SuggestedProducts = async ({
	category,
}: SuggestedProductsProps) => {
	const products = await getProductsByCategoryName(category);
	if (!products) {
		return notFound();
	}

	await wait(5000);
	return (
		<>
			<h2>Suggested Products</h2>
			<ProductList products={products} />
		</>
	);
};
