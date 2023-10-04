import { getCartFromCookies } from "@/api/cart";
import { formatMoney } from "@/utils";
import { redirect } from "next/navigation";
import { ChangeProductQuantity } from "./ChangeProductQuantity";
import { RemoveButton } from "./RemoveButton";

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
		</div>
	);
}
