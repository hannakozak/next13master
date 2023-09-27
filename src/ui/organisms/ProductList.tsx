import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductListItem } from "@/ui/molecules/ProductListItem";

export const ProductList = ({
	products,
}: {
	products: ProductListItemFragment[];
}) => {
	return (
		<ul
			className="my-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
			data-testid="products-list"
		>
			{products.map((product) => {
				return (
					<li key={product.name}>
						<ProductListItem product={product} />
					</li>
				);
			})}
		</ul>
	);
};
