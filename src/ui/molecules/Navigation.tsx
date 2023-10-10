import { type UrlObject } from "url";
import { type Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getCartFromCookies } from "@/api/cart";

type NavLinksProps = {
	href: Route<string> | UrlObject;
	label: string;
	exact: boolean;
};

const navLinks: NavLinksProps[] = [
	{ href: "/", label: "Home", exact: true },
	{ href: "/products", label: "All", exact: false },
	{ href: "/categories/T-Shirts", label: "T-shirts", exact: false },
	{ href: "/categories/Hoodies", label: "Hoodies", exact: false },
	{
		href: "/categories/Accessories",
		label: "Accessories",
		exact: false,
	},
];
export const Navigation = async () => {
	const cart = await getCartFromCookies();
	const totalQuantity = cart?.orderItems.reduce(
		(sum, item) => sum + item.quantity,
		0,
	);
	return (
		<nav>
			<ul className="flex justify-center">
				{navLinks.map(({ href, label, exact }) => (
					<li key={label} className="px-2">
						<ActiveLink
							href={href}
							exact={exact}
							className="font-semibold text-blue-600 hover:text-blue-800"
							activeClassName="text-blue-800 border border-2 border-b-blue-800"
						>
							{label}
						</ActiveLink>
					</li>
				))}
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
			</ul>
		</nav>
	);
};
