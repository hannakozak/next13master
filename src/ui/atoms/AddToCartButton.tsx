"use client";

import { useFormStatus as useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const formStatus = useFormStatus();
	formStatus.pending;
	return (
		<>
			<button
				data-testid="add-to-cart-button"
				type="submit"
				disabled={formStatus.pending}
				className="brighness-100 font-semiboldbold mb-10 h-14 w-full rounded-md bg-gradient-to-r from-gray-900  to-amber-600 text-xl text-white shadow-md hover:brightness-125 disabled:cursor-wait disabled:brightness-50"
			>
				Add To Card
			</button>
		</>
	);
};
