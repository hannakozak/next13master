import { type ProductItemType } from "@/ui/types";
import { formatMoney } from "@/utils";

type ProductDescriptionProps = {
	product: ProductItemType;
};

export const ProductDescription = ({
	product: { category, name, price, description },
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
			<p>{description}</p>
			<div className="flex flex-row justify-between"></div>
			<p className="text-sm text-gray-500">
				<span className="">Category: </span>
				{category}
			</p>
			<button className="brighness-100 font-semiboldbold h-14 rounded-md bg-gradient-to-r  from-blue-500 via-blue-800 to-blue-950 text-xl text-white shadow-md hover:brightness-125">
				Add To Card
			</button>
		</div>
	);
};
