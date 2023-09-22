import { ActiveLink } from "../atoms/ActiveLink";
import { getPaginationRange } from "@/utils";

type PaginationProps = {
	currentPage: number;
	productsCount: number;
	path: "products" | `categories/${string}`;
};

export const Pagination = ({
	currentPage,
	productsCount,
	path,
}: PaginationProps) => {
	const pageNumbers = getPaginationRange({
		currentPage,
		productsCount,
	});

	return (
		<nav aria-label="pagination" className="text-center">
			<ul className="inline-flex -space-x-px text-sm">
				{pageNumbers.map((pageNumber) => (
					<li key={pageNumber}>
						<ActiveLink
							href={`/${path}/${pageNumber}`}
							exact={false}
							className="m-1 rounded-md border-2 px-3 py-2 font-semibold text-blue-600 hover:text-blue-800"
							activeClassName="text-blue-800 border border-2 border-blue-800"
						>
							{pageNumber}
						</ActiveLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
