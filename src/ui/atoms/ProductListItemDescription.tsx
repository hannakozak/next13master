import { type ProductListItemFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragment;
};

export const ProductListItemDescription = ({
	product: { categories, name, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="m-2">
			<div className="flex flex-row justify-between">
				<h1 className="text-sm font-semibold text-gray-700">
					{name}
				</h1>
				<p className="text-sm font-medium text-gray-900">
					<span className="sr-only">Cena:</span>
					{formatMoney(price / 100)}
				</p>
			</div>
			{categories[0] && (
				<p className="text-sm text-gray-500">
					<span className="sr-only">Kategoria</span>
					{categories[0].name}
				</p>
			)}
		</div>
	);
};
