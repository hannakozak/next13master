import Link from "next/link";

export const Navigation = () => {
	return (
		<nav className="border-b-2 p-3">
			<ul className="flex justify-center">
				<li className="px-2">
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/products">Products</Link>
				</li>
			</ul>
		</nav>
	);
};
