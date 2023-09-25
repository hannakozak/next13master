import { type UrlObject } from "url";
import { type Route } from "next";
import Image from "next/image";
import { ActiveLink } from "../atoms/ActiveLink";

type NavLinksProps = {
	href: Route<string> | UrlObject;
	label: string;
	exact: boolean;
	photo: string;
};

const collectionLinks: NavLinksProps[] = [
	{
		href: "/collections/summer-vibes",
		label: "Summer Vibes",
		exact: false,
		photo: "/images/summer-vibes.jpg",
	},
	{
		href: "/collections/new-arrivals",
		label: "New Arrivals",
		exact: false,
		photo: "/images/new-arrivals.jpg",
	},
	{
		href: "/collections/elegant-extras",
		label: "Elegant Extras",
		exact: false,
		photo: "/images/elegant-extras.jpg",
	},
];
export const CollectionsNavigation = () => {
	return (
		<nav>
			<ul className="flex justify-center gap-5">
				{collectionLinks.map(({ href, label, exact, photo }) => (
					<li key={label}>
						<ActiveLink
							href={href}
							exact={exact}
							className="font-semibold text-gray-600 hover:text-gray-900"
							activeClassName="text-blue-800 border border-2 border-b-blue-800"
						>
							<Image
								src={photo}
								width={300}
								height={300}
								alt={label}
								className=" w-full object-contain object-center py-3 pr-4 transition-transform hover:scale-105"
							/>
							<h3>{label}</h3>
						</ActiveLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
