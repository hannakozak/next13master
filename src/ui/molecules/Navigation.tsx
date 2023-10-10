import { type UrlObject } from "url";
import { type Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";

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
	return (
		<>
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
				</ul>
			</nav>
		</>
	);
};
