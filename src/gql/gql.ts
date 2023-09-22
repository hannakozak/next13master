/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    price\n  }\n}": types.ProductGetByIdDocument,
    "query ProductsGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products {\n      id\n      name\n      price\n      description\n      categories(first: 1) {\n        name\n      }\n      images(first: 1) {\n        url\n      }\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCategorySlugAndPage($slug: String!, $productsPerPage: Int!, $offset: Int!) {\n  categories(where: {slug: $slug}) {\n    products(first: $productsPerPage, skip: $offset) {\n      id\n      name\n      price\n      description\n      categories(first: 1) {\n        name\n      }\n      images(first: 1) {\n        url\n      }\n    }\n  }\n}": types.ProductsGetByCategorySlugAndPageDocument,
    "query GetProductsCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.GetProductsCountDocument,
    "query ProductsGetList($productsPerPage: Int, $offset: Int) {\n  products(first: $productsPerPage, skip: $offset) {\n    id\n    name\n    price\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    price\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products {\n      id\n      name\n      price\n      description\n      categories(first: 1) {\n        name\n      }\n      images(first: 1) {\n        url\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlugAndPage($slug: String!, $productsPerPage: Int!, $offset: Int!) {\n  categories(where: {slug: $slug}) {\n    products(first: $productsPerPage, skip: $offset) {\n      id\n      name\n      price\n      description\n      categories(first: 1) {\n        name\n      }\n      images(first: 1) {\n        url\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugAndPageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductsCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').GetProductsCountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($productsPerPage: Int, $offset: Int) {\n  products(first: $productsPerPage, skip: $offset) {\n    id\n    name\n    price\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
