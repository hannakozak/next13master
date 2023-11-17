import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function CartSuccess({
	searchParams,
}: {
	searchParams: { session_id: string };
}) {
	if (!searchParams.session_id) {
		redirect("/");
	}
	if (!process.env.STRIPE_SECRET_KEY) {
		return null;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const stripeCheckoutSession =
		await stripe.checkout.sessions.retrieve(searchParams.session_id);

	return (
		<div className="bg-blue-800 text-white">
			<h2>{stripeCheckoutSession.payment_status}</h2>
		</div>
	);
}
