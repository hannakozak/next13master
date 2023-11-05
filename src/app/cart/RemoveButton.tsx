"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeItem } from "./actions";
import { X } from "lucide-react";

export function RemoveButton({ productId }: { productId: string }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<button
			data-testid="remove-button"
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					await removeItem(productId);
					router.refresh();
				})
			}
		>
			<X />
		</button>
	);
}
