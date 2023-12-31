import { ProductDescription } from "@/ui/molecules/ProductDescription";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductItemFragment } from "@/gql/graphql";
import { AddToCartButton } from "@/ui/atoms/AddToCartButton";
import { getOrCreateCart, addToCart } from "@/api/cart";
import { VariantsList } from "./VariantsList";
import { revalidatePath } from "next/cache";

type ProductProps = {
	product: ProductItemFragment;
};
export const Product = async ({ product }: ProductProps) => {
	async function addToCartAction(_formData: FormData) {
		"use server";

		const cart = await getOrCreateCart();
		await addToCart(cart.id, product.id);
		revalidatePath("/");
	}

	return (
		<article className="mx-auto my-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
			{product.images[0] && (
				<ProductCoverImage
					src={product.images[0].url}
					alt={product.name}
					width={320}
					height={200}
				/>
			)}
			<aside>
				<ProductDescription product={product} />
				<VariantsList productId={product.id} />
				<form action={addToCartAction}>
					<AddToCartButton />
				</form>
			</aside>
		</article>
	);
};
