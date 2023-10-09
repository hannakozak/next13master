"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const AddReviewButton = () => {
	const formStatus = useFormStatus();
	formStatus.pending;
	return (
		<button
			type="submit"
			disabled={formStatus.pending}
			data-testid="add-to-cart-button"
			className="brighness-100 font-semiboldbold h-14 w-full rounded-md bg-gradient-to-r from-blue-500  via-blue-800 to-blue-950 text-xl text-white shadow-md hover:brightness-125 disabled:cursor-wait disabled:brightness-50"
		>
			Add Review
		</button>
	);
};
