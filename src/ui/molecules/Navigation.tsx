import { ActiveLink } from "../atoms/ActiveLink";

export const Navigation = () => {
	return (
		<nav className="border-b-2 p-3">
			<ul className="flex justify-center">
				<li className="px-2">
					<ActiveLink
						href="/"
						exact
						className="font-semibold text-blue-600 hover:text-blue-800"
						activeClassName="text-blue-800 border border-2 border-b-blue-800"
					>
						Home
					</ActiveLink>
				</li>
				<li>
					<ActiveLink
						href="/products"
						className=" font-semibold text-blue-600 hover:text-blue-800"
						activeClassName="text-blue-800 border border-2 border-b-blue-800"
					>
						All
					</ActiveLink>
				</li>
			</ul>
		</nav>
	);
};
