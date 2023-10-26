import { executeGraphql } from "./graphqlApi";
import {
	CategoriesGetByNameDocument,
	CategoriesGetListDocument,
} from "@/gql/graphql";

export const getCategoriesList = async () => {
	const graphqlResponse = await executeGraphql({
		query: CategoriesGetListDocument,
		variables: {},
		next: {
			revalidate: 1,
		},
	});
	return graphqlResponse.categories;
};

export const getCategoryByName = async (categorySlug: string) => {
	const graphqlResponse = await executeGraphql({
		query: CategoriesGetByNameDocument,
		variables: { slug: categorySlug },
	});
	return graphqlResponse.categories[0];
};
