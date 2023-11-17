/// <reference types="stripe-event-types" />
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest): Promise<Response> {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY");
	}

	if (!process.env.STRIPE_WEBHOOK_SECRET) {
		throw new Error("Missing STRIPE_WEBHOOK_SECRET");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const sigantue = request.headers.get("stripe-signature");

	if (!sigantue) {
		return new Response("Missing stripe signature", { status: 401 });
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		sigantue,
		process.env.STRIPE_WEBHOOK_SECRET,
	) as Stripe.DiscriminatedEvent;

	switch (event.type) {
		case "checkout.session.completed": {
			console.dir(event, { depth: 999 });
			event.data.object.metadata?.cartId;
		}
	}
	return new Response("OK", { status: 204 });
}
