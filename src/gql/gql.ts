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
    "query CategoriesGetByName($name: String!) {\n  categories(where: {name: $name}) {\n    id\n    name\n    slug\n  }\n}": types.CategoriesGetByNameDocument,
    "query CategoriesGetList {\n  categories {\n    id\n    name\n    slug\n  }\n}": types.CategoriesGetListDocument,
    "query CollectionsGetBySlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    id\n    name\n    slug\n  }\n}": types.CollectionsGetBySlugDocument,
    "query CollectionsGetList {\n  collections {\n    id\n    name\n    slug\n  }\n}": types.CollectionsGetListDocument,
    "query CollectionsGetProductsByCollectionSlug($slug: String, $productsPerPage: Int, $offset: Int) {\n  collections(where: {slug: $slug}) {\n    products(first: $productsPerPage, skip: $offset) {\n      id\n      name\n      price\n      description\n      categories(first: 1) {\n        name\n      }\n      images(first: 1) {\n        url\n      }\n    }\n  }\n}": types.CollectionsGetProductsByCollectionSlugDocument,
    "query CollectionsGetProductsTotalCountByCollectionSlug($slug: String!) {\n  productsConnection(where: {collections_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.CollectionsGetProductsTotalCountByCollectionSlugDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    price\n  }\n}": types.ProductGetByIdDocument,
    "query ProductsGetByCategoryName($name: String, $productsPerPage: Int, $offset: Int) {\n  categories(where: {name: $name}) {\n    products(first: $productsPerPage, skip: $offset) {\n      id\n      name\n      price\n      description\n      categories(first: 1) {\n        name\n      }\n      images(first: 1) {\n        url\n      }\n    }\n  }\n}": types.ProductsGetByCategoryNameDocument,
    "query ProductsGetList($productsPerPage: Int, $offset: Int) {\n  products(first: $productsPerPage, skip: $offset) {\n    id\n    name\n    price\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetTotalCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetTotalCountDocument,
    "query ProductsGetTotalCountByCategoryName($name: String!) {\n  productsConnection(where: {categories_some: {name: $name}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetTotalCountByCategoryNameDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetByName($name: String!) {\n  categories(where: {name: $name}) {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').CategoriesGetByNameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList {\n  categories {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetBySlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').CollectionsGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetProductsByCollectionSlug($slug: String, $productsPerPage: Int, $offset: Int) {\n  collections(where: {slug: $slug}) {\n    products(first: $productsPerPage, skip: $offset) {\n      id\n      name\n      price\n      description\n      categories(first: 1) {\n        name\n      }\n      images(first: 1) {\n        url\n      }\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetProductsByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetProductsTotalCountByCollectionSlug($slug: String!) {\n  productsConnection(where: {collections_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetProductsTotalCountByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    price\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategoryName($name: String, $productsPerPage: Int, $offset: Int) {\n  categories(where: {name: $name}) {\n    products(first: $productsPerPage, skip: $offset) {\n      id\n      name\n      price\n      description\n      categories(first: 1) {\n        name\n      }\n      images(first: 1) {\n        url\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategoryNameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($productsPerPage: Int, $offset: Int) {\n  products(first: $productsPerPage, skip: $offset) {\n    id\n    name\n    price\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetTotalCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetTotalCountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetTotalCountByCategoryName($name: String!) {\n  productsConnection(where: {categories_some: {name: $name}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetTotalCountByCategoryNameDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
