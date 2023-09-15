export const formatMoney = (amount: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
};

export const getPaginationRange = ({
	currentPage,
	min = 1,
	total = 20,
	length = 5,
}: {
	currentPage: number;
	min?: number;
	total?: number;
	length?: number;
}) => {
	if (length > total) length = total;

	let start = currentPage - Math.floor(length / 2);
	start = Math.max(start, min);
	start = Math.min(start, min + total - length);

	return Array.from({ length: length }, (_, i) => start + i);
};
