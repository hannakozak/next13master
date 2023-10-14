import { getCartFromCookies } from "@/api/cart";
import { formatMoney } from "@/utils";
import { redirect } from "next/navigation";
import { ChangeProductQuantity } from "./ChangeProductQuantity";
import { RemoveButton } from "./RemoveButton";
import { handleStripePaymentAction } from "./actions";
import { revalidatePath } from "next/cache";

export default async function CartPage() {
	const cart = await getCartFromCookies();
	if (!cart) {
		redirect("/");
	}
	revalidatePath("/cart");
	return (
		<div className="mt-10" aria-busy={false}>
			<table className="table-fixed">
				<thead>
					<tr>
						<th>Product</th>
						<th className="px-12 text-center">Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map(
						(item) =>
							item.product && (
								<tr key={item.id}>
									<td>{item.product.name}</td>
									<td className="px-12 text-center">
										<ChangeProductQuantity
											quantity={item.quantity}
											itemId={item.id}
										/>
									</td>
									<td>{formatMoney(item.product.price / 100)}</td>
									<td className="px-4 py-2">
										<RemoveButton productId={item.id} />
									</td>
								</tr>
							),
					)}
				</tbody>
			</table>
			<form action={handleStripePaymentAction} className="ml-auto">
				<button
					type="submit"
					className="brighness-100 font-semiboldbold h-10 rounded-md border bg-gradient-to-r from-blue-500 via-blue-800  to-blue-950 px-6 text-xl text-white shadow-md hover:brightness-125 disabled:cursor-wait disabled:brightness-50"
				>
					Pay
				</button>
			</form>
		</div>
	);
}
