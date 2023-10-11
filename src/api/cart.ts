import {
	CartFragment,
	CartGetByIdDocument,
	CartCreateDocument,
	ProductGetByIdDocument,
	CartAddProductDocument,
	CartSetProductQuantityDocument,
} from "@/gql/graphql";
import { cookies } from "next/headers";
import { executeGraphql } from "./graphqlApi";

export async function getOrCreateCart(): Promise<CartFragment> {
	const existingCart = await getCartFromCookies();

	if (existingCart) {
		return existingCart;
	}

	const cart = await createCart();
	if (!cart.createOrder) {
		throw new Error("Failed to create cart");
	}
	cookies().set("cartId", cart.createOrder.id, {
		httpOnly: true,
		sameSite: "lax",
		//secure: true,
	});

	return cart.createOrder;
}

export async function getCartFromCookies() {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await executeGraphql({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			next: {
				tags: ["cart"],
			},
			cache: "no-store",
		});
		if (cart.order) {
			return cart.order;
		}
	}
}

export function createCart() {
	return executeGraphql({
		query: CartCreateDocument,
		variables: {},
		next: {},
		cache: "no-store",
	});
}

export async function addToCart(orderId: string, productId: string) {
	const existingCart = await getCartFromCookies();
	const productInCart = existingCart?.orderItems.find(
		(item) => item?.product?.id === productId,
	);

	if (!productInCart) {
		const { product } = await executeGraphql({
			query: ProductGetByIdDocument,
			variables: {
				id: productId,
			},
			next: {},
			cache: "no-store",
		});
		if (!product) {
			throw new Error("Product not found");
		}
		await executeGraphql({
			query: CartAddProductDocument,
			variables: {
				orderId,
				productId,
				total: product?.price,
			},
			next: {},
			cache: "no-store",
		});
	} else {
		await executeGraphql({
			query: CartSetProductQuantityDocument,
			variables: {
				itemId: productInCart.id,
				quantity: productInCart.quantity + 1,
			},
			next: {
				tags: ["cart"],
			},
			cache: "no-store",
		});
	}
}
