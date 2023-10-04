import { executeGraphql } from "./graphqlApi";
import {
	CategoriesGetByNameDocument,
	CategoriesGetListDocument,
} from "@/gql/graphql";

export const getCategoriesList = async () => {
	const graphqlResponse = await executeGraphql({
		query: CategoriesGetListDocument,
		variables: {},
	});
	return graphqlResponse.categories;
};

export const getCategoryByName = async (categoryName: string) => {
	const graphqlResponse = await executeGraphql({
		query: CategoriesGetByNameDocument,
		variables: { name: categoryName },
	});
	return graphqlResponse.categories[0];
};
