import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsList } from "@/api/products";
import { Pagination } from "@/ui/molecules/Pagination";
import { executeGraphql } from "@/api/graphqlApi";
import { GetProductsCountDocument } from "@/gql/graphql";

export const generateStaticParams = async ({
	params,
}: {
	params: { pageNumber: number };
}) => {
	await getProductsList(params.pageNumber);
	const graphqlResponse = await executeGraphql(
		GetProductsCountDocument,
		{},
	);
	const productsCount =
		graphqlResponse.productsConnection.aggregate.count;

	const productsPerPage = 4;

	const numberGeneretedPages = Math.ceil(
		productsCount / productsPerPage,
	);

	return Array.from({ length: numberGeneretedPages }, (_, index) => ({
		pageNumber: (index + 1).toString(),
	}));
};

export default async function Products({
	params,
}: {
	params: { pageNumber: number };
}) {
	const products = await getProductsList(params.pageNumber);
	const graphqlResponse = await executeGraphql(
		GetProductsCountDocument,
		{},
	);
	const productsCount =
		graphqlResponse.productsConnection.aggregate.count;

	return (
		<>
			<ProductList products={products} />
			<Pagination
				currentPage={params.pageNumber}
				productsCount={productsCount}
				path="products"
			/>
		</>
	);
}
