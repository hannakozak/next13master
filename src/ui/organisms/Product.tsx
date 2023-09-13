import { type ProductItemType } from "../types";
import { ProductDescription } from "../molecules/ProductDescription";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";

export const Product = ({
	product,
}: {
	product: ProductItemType;
}) => {
	return (
		<article className="my-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
			<ProductCoverImage {...product.coverImage} />
			<ProductDescription product={product} />
		</article>
	);
};
