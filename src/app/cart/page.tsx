import { getCartFromCookies } from "@/api/cart";
import { formatMoney } from "@/utils";
import { redirect } from "next/navigation";

export default async function CartPage() {
	const cart = await getCartFromCookies();
	if (!cart) {
		redirect("/");
	}
	return (
		<div className="mt-10">
			<table className="table-fixed">
				<thead>
					<tr>
						<th>Product</th>
						<th className="px-4 text-center">Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map(
						(item) =>
							item.product && (
								<tr key={item.id}>
									<td>{item.product.name}</td>
									<td className="text-center">{item.quantity}</td>
									<td>{formatMoney(item.product.price / 100)}</td>
								</tr>
							),
					)}
				</tbody>
			</table>
		</div>
	);
}
