import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
import {
	CategoriesGetByNameDocument,
	CategoriesGetListDocument,
} from "@/gql/graphql";

type CategoryItemType = {
	id: string;
	name: string;
	slug: string;
};

export const getCategoriesList = async (): Promise<
	CategoryItemType[]
> => {
	const graphqlResponse = await executeGraphql(
		CategoriesGetListDocument,
		{},
	);
	return graphqlResponse.categories;
};

export const getCategoryByName = async (
	categoryName: string,
): Promise<CategoryItemType> => {
	const graphqlResponse = await executeGraphql(
		CategoriesGetByNameDocument,
		{ name: categoryName },
	);
	const category = graphqlResponse.categories[0];
	if (!category) {
		notFound();
	}
	return category;
};
