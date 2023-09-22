import { type UrlObject } from "url";
import { type Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";

type NavLinksProps = {
	href: UrlObject | Route<string>;
	label: string;
	exact: boolean;
};

const navLinks: NavLinksProps[] = [
	{ href: "/", label: "Home", exact: true },
	{ href: "/products", label: "All", exact: false },
	{ href: "/categories/t-shirts", label: "T-Shirts", exact: false },
	{ href: "/categories/hoodies", label: "Hoodies", exact: false },
	{
		href: "/categories/accessories",
		label: "Accessories",
		exact: false,
	},
];
export const Navigation = () => {
	return (
		<nav className="border-b-2 p-3">
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
			</ul>
		</nav>
	);
};
