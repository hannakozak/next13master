import Link from "next/link";
import { type ProductItemType } from "@/ui/types";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({
	product,
}: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					{product.coverImage && (
						<ProductCoverImage {...product.coverImage} />
					)}
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
