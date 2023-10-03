import { Suspense } from "react";
import { Navigation } from "../molecules/Navigation";
import { SearchInput } from "../molecules/SearchInput";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const Header = () => {
	return (
		<header className="fixed top-0 flex w-screen items-center justify-between  border-b-2 bg-white px-6 py-3">
			<Navigation />
			<aside className="flex items-center gap-3">
				<Link href={"/cart"}>
					<ShoppingCart />
				</Link>
				<Suspense>
					<SearchInput />
				</Suspense>
			</aside>
		</header>
	);
};
