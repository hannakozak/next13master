export const formatMoney = (amount: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
};

export const getPaginationRange = ({
	currentPage,
	min = 1,
	productsCount,
	productsPerPage = 4,
}: {
	currentPage: number;
	min?: number;
	total?: number;
	productsCount: number;
	productsPerPage?: number;
}) => {
	const numberOfPages = Math.ceil(productsCount / productsPerPage);
	if (productsPerPage > numberOfPages)
		productsPerPage = numberOfPages;

	let start = currentPage - Math.floor(numberOfPages / 2);
	start = Math.max(start, min);
	start = Math.min(start, min + productsCount - numberOfPages);

	return Array.from({ length: numberOfPages }, (_, i) => start + i);
};
