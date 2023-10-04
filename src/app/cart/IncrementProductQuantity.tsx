"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "./actions";

type IncrementProductQuantityProps = {
	quantity: number;
	itemId: string;
};

export const IncrementProductQuantity = ({
	quantity,
	itemId,
}: IncrementProductQuantityProps) => {
	const [optimisticQuantity, setOptimisticQuantity] =
		useOptimistic(quantity);
	return (
		<form className="flex items-center gap-3">
			<div data-testid="quantity">{optimisticQuantity}</div>
			<button
				data-testid="increment"
				className="h-8 w-8 border bg-slate-50"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(itemId, optimisticQuantity + 1);
				}}
			>
				+
			</button>
		</form>
	);
};
