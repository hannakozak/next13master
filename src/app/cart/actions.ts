"use server";

import { getCartFromCookies } from "@/api/cart";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartRemoveProductDocument,
	CartSetProductQuantityDocument,
} from "@/gql/graphql";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export const removeItem = (itemId: string) => {
	return executeGraphql({
		query: CartRemoveProductDocument,
		variables: {
			itemId,
		},
	});
};

export const changeItemQuantity = async (
	itemId: string,
	quantity: number,
) => {
	if (quantity === 0) {
		return executeGraphql({
			query: CartRemoveProductDocument,
			variables: {
				itemId,
			},
			next: {},
			cache: "no-cache",
		});
	} else {
		return executeGraphql({
			query: CartSetProductQuantityDocument,
			variables: {
				itemId,
				quantity,
			},
			next: {},
			cache: "no-cache",
		});
	}
};

export async function handleStripePaymentAction() {
	"use server";

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY env variable");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const cart = await getCartFromCookies();
	if (!cart) {
		return;
	}

	const session = await stripe.checkout.sessions.create({
		metadata: {
			cartId: cart.id,
		},
		payment_method_types: ["card"],
		line_items: cart.orderItems
			.map((item) => ({
				price_data: {
					currency: "usd",
					product_data: {
						name: item.product?.name || "",
					},
					unit_amount: item.product?.price || 0,
				},
				quantity: item.quantity,
			}))
			.filter(Boolean),
		mode: "payment",
		success_url: `http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `http://localhost:3000/cart/canceled`,
	});

	if (session.url) {
		cookies().set("cartId", "");
		redirect(session.url);
	}
}
