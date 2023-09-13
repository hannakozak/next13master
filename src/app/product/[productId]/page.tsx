import { getProductById } from "@/api/products";
import { Product } from "@/ui/organisms/Product";

export default async function SingleProductPage({
	params,
}: {
	params: { productId: string };
}) {
	const product = await getProductById(params.productId);
	return <Product product={product} />;
}
