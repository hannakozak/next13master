"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export const SearchInput = () => {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearchTerm = useDebounce(searchQuery, 500);

	const onSearch = (event: React.FormEvent) => {
		event.preventDefault();

		const encodedSearchQuery = encodeURI(searchQuery);
		router.push(`/search?query=${encodedSearchQuery}`);
	};

	useEffect(() => {
		if (debouncedSearchTerm) {
			router.push(`/search?query=${debouncedSearchTerm}`);
		}
	}, [debouncedSearchTerm, router]);

	return (
		<form onSubmit={onSearch}>
			<label
				htmlFor="search"
				className="flex rounded-lg border-2 p-2"
			>
				<input
					type="search"
					name="search"
					value={searchQuery}
					onChange={(event) => setSearchQuery(event.target.value)}
					className="w-50 focus:outline-none"
					aria-label="Search"
				/>
				<Search />
			</label>
		</form>
	);
};
