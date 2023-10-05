import { type TypedDocumentString } from "@/gql/graphql";

export const executeGraphql = async <TResult, TVariables>({
	query,
	variables,
	next,
	cache,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	variables: TVariables;
	next?: NextFetchRequestConfig;
	cache?: RequestCache;
}): Promise<TResult> => {
	const token = process.env.PERMANENT_AUTH_TOKEN;
	if (!token) throw TypeError("PERMANENT_AUTH_TOKEN is not defined");

	if (!process.env.GRAPHQL_SCHEMA_URL)
		throw TypeError("GRAPHQL_SCHEMA_URL is not defined");
	const res = await fetch(process.env.GRAPHQL_SCHEMA_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		next,
		cache,
	});

	type GraphQLResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors?: undefined };

	const graphqlResponse =
		(await res.json()) as GraphQLResponse<TResult>;

	if (graphqlResponse.errors) {
		console.log(graphqlResponse);
		throw TypeError(`GraphQL Error`, {
			cause: graphqlResponse.errors,
		});
	}

	return graphqlResponse.data;
};
