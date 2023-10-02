import { Suspense } from "react";
import { Navigation } from "../molecules/Navigation";
import { SearchInput } from "../molecules/SearchInput";

export const Header = () => {
	return (
		<header className="fixed top-0 flex w-screen items-center justify-between border-b-2 bg-white px-6 py-3">
			<Navigation />
			<Suspense>
				<SearchInput />
			</Suspense>
		</header>
	);
};
