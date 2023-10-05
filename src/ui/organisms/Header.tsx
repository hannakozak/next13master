import { Suspense } from "react";
import { Navigation } from "../molecules/Navigation";
import { SearchInput } from "../molecules/SearchInput";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { getCartFromCookies } from "@/api/cart";
import { revalidatePath } from "next/cache";

export const Header = async () => {
	const cart = await getCartFromCookies();
	const totalQuantity = cart?.orderItems.reduce(
		(sum, item) => sum + item.quantity,
		0,
	);
	revalidatePath("/cart");
	return (
		<header className="fixed top-0 flex w-screen items-center justify-between  border-b-2 bg-white px-6 py-3">
			<Navigation />
			<aside className="flex items-center gap-3">
				<Link
					href={"/cart"}
					className="group -m-2 flex items-center p-2"
				>
					<ShoppingCart />
					<span className="ml-2 text-sm font-medium">
						{totalQuantity}
					</span>
					<span className="sr-only">Items in cart, view bag</span>
				</Link>
				<Suspense>
					<SearchInput />
				</Suspense>
			</aside>
		</header>
	);
};
