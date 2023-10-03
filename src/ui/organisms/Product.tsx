import { ProductDescription } from "../molecules/ProductDescription";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { cookies } from "next/headers";
import { ProductItemFragment } from "@/gql/graphql";
import { AddToCartButton } from "../atoms/AddToCartButton";
import { getOrCreateCart, addToCart } from "@/api/cart";

type ProductProps = {
	product: ProductItemFragment;
};
export const Product = async ({ product }: ProductProps) => {
	async function addToCartAction(_formData: FormData) {
		"use server";
		const cart = await getOrCreateCart();
		cookies().set("cartId", cart.id, {
			httpOnly: true,
			sameSite: "lax",
		});
		await addToCart(cart.id, product.id);
	}

	return (
		<article className="mx-auto my-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
			{product.images[0] && (
				<ProductCoverImage
					src={product.images[0].url}
					alt={product.name}
					width={320}
					height={320}
				/>
			)}
			<aside>
				<ProductDescription product={product} />
				<form action={addToCartAction}>
					<AddToCartButton />
				</form>
			</aside>
		</article>
	);
};
