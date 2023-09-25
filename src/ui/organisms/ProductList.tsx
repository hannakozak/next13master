import { ProductListItem } from "@/ui/molecules/ProductListItem";
import { type ProductItemType } from "@/ui/types";

export const ProductList = ({
	products,
}: {
	products: ProductItemType[];
}) => {
	return (
		<ul
			className="my-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
			data-testid="products-list"
		>
			{products.map((product) => {
				return (
					<li key={product.id}>
						<ProductListItem product={product} />
					</li>
				);
			})}
		</ul>
	);
};
