import { type ProductItemType } from "@/ui/types";
import { formatMoney } from "@/utils";

type ProductListItemDescriptionProps = {
	product: ProductItemType;
};

export const ProductListItemDescription = ({
	product: { category, name, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="m-2">
			<div className="flex flex-row justify-between">
				<h3 className="text-sm font-semibold text-gray-700">
					{name}
				</h3>
				<p className="text-sm font-medium text-gray-900">
					<span className="sr-only">Cena:</span>
					{formatMoney(price / 100)}
				</p>
			</div>
			<p className="text-sm text-gray-500">
				<span className="sr-only">Kategoria</span>
				{category}
			</p>
		</div>
	);
};
