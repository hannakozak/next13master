import { Suspense } from "react";
import { Navigation } from "../molecules/Navigation";
import { SearchInput } from "../molecules/SearchInput";
import { revalidatePath } from "next/cache";

export const Header = async () => {
	revalidatePath("/cart");
	return (
		<header className="fixed top-0 flex w-screen items-center justify-between  border-b-2 bg-white px-6 py-3">
			<Navigation />
			<aside className="flex items-center gap-3">
				<Suspense>
					<SearchInput />
				</Suspense>
			</aside>
		</header>
	);
};
