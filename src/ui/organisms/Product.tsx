import { ProductDescription } from "../molecules/ProductDescription";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { cookies } from "next/headers";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartAddProductDocument,
	CartCreateDocument,
	CartFragment,
	CartGetByIdDocument,
	ProductGetByIdDocument,
	ProductItemFragment,
} from "@/gql/graphql";
import { AddToCartButton } from "../atoms/AddToCartButton";

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

async function getOrCreateCart(): Promise<CartFragment> {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await getCartById(cartId);
		if (cart.order) {
			return cart.order;
		}
	}
	const cart = await createCart();
	if (!cart.createOrder) {
		throw new Error("Failed to create cart");
	}
	return cart.createOrder;
}

async function getCartById(cartId: string) {
	return executeGraphql(CartGetByIdDocument, { id: cartId });
}

function createCart() {
	return executeGraphql(CartCreateDocument, {});
}

async function addToCart(orderId: string, productId: string) {
	const { product } = await executeGraphql(ProductGetByIdDocument, {
		id: productId,
	});
	if (!product) {
		throw new Error("Product not found");
	}
	await executeGraphql(CartAddProductDocument, {
		orderId,
		productId,
		total: product?.price,
	});
}
