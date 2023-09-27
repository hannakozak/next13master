import Link from "next/link";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { type ProductListItemFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductListItemFragment;
};

export const ProductListItem = ({
	product,
}: ProductListItemProps) => {
	return (
		<Link href={`/product/${product.id}`} aria-busy={false}>
			<article>
				{product.images[0] && (
					<ProductCoverImage src={product.images[0].url} alt="" />
				)}
				<ProductListItemDescription product={product} />
			</article>
		</Link>
	);
};
