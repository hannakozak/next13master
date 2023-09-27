import { ProductDescription } from "../molecules/ProductDescription";
import { type ProductItemFragment } from "@/gql/graphql";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";

type ProductProps = {
	product: ProductItemFragment;
};

export const Product = async ({ product }: ProductProps) => {
	return (
		<article className="my-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
			{product.images[0] && (
				<ProductCoverImage src={product.images[0].url} alt="" />
			)}
			<ProductDescription product={product} />
		</article>
	);
};
