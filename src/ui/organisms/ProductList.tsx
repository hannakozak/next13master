"use client";

import { type ProductListItemFragment } from "@/gql/graphql";
import { ProductListItem } from "@/ui/molecules/ProductListItem";

export const ProductList = ({
	products,
}: {
	products: ProductListItemFragment[];
}) => {
	return (
		<>
			<ul
				data-testid="products-list"
				className="my-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
			>
				{products.map((product) => {
					return (
						<ProductListItem product={product} key={product.id} />
					);
				})}
			</ul>
		</>
	);
};
