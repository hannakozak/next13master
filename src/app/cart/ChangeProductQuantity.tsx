"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "./actions";
import { useRouter } from "next/navigation";

type ChangeProductQuantityProps = {
	quantity: number;
	itemId: string;
};

export const ChangeProductQuantity = ({
	quantity,
	itemId,
}: ChangeProductQuantityProps) => {
	const [optimisticQuantity, setOptimisticQuantity] =
		useOptimistic(quantity);
	const router = useRouter();
	return (
		<form className="flex items-center gap-3">
			<button
				data-testid="decrement"
				className="h-8 w-8 border bg-slate-50"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(itemId, optimisticQuantity - 1);
					router.refresh();
				}}
			>
				-
			</button>
			<div data-testid="quantity">{optimisticQuantity}</div>
			<button
				data-testid="increment"
				className="h-8 w-8 border bg-slate-50"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(itemId, optimisticQuantity + 1);
					router.refresh();
				}}
			>
				+
			</button>
		</form>
	);
};
