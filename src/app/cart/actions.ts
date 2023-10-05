"use server";

import { executeGraphql } from "@/api/graphqlApi";
import {
	CartRemoveProductDocument,
	CartSetProductQuantityDocument,
} from "@/gql/graphql";

export const removeItem = (itemId: string) => {
	return executeGraphql({
		query: CartRemoveProductDocument,
		variables: {
			itemId,
		},
	});
};

export const changeItemQuantity = async (
	itemId: string,
	quantity: number,
) => {
	if (quantity === 0) {
		return executeGraphql({
			query: CartRemoveProductDocument,
			variables: {
				itemId,
			},
			cache: "no-cache",
		});
	} else {
		return executeGraphql({
			query: CartSetProductQuantityDocument,
			variables: {
				itemId,
				quantity,
			},
			next: {
				tags: ["cart"],
			},
			cache: "no-cache",
		});
	}
};
