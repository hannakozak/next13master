import { type ProductItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";

type ProductDescriptionProps = {
	product: ProductItemFragment;
};

export const ProductDescription = ({
	product: { categories, name, price, description },
}: ProductDescriptionProps) => {
	return (
		<div className="flex flex-col gap-8">
			<h1 className="text-center text-2xl font-semibold text-blue-800">
				{name}
			</h1>
			<p className="text-xl font-bold text-blue-800">
				<span className="sr-only">Cena:</span>
				{formatMoney(price / 100)}
			</p>
			{categories[0] && (
				<p className="text-sm text-gray-500">
					<span className="">Category: </span>
					{categories[0].name}
				</p>
			)}
			<p>{description}</p>
		</div>
	);
};
