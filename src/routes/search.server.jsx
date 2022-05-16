import gql from "graphql-tag";
import { flattenConnection, CacheHours } from "@shopify/hydrogen";

import Layout from "../components/Layout.server";
import SearchResult from "../components/SearchResult.client";
import NotFound from "../components/NotFound.server";

import { useShopQuery, useUrl } from "@shopify/hydrogen";

export async function api(request, response) {
  return <Search />;
}

const Search = ({ request, response }) => {
  console.log("request", request.url);
  console.log("response", response);
  const url = useUrl();
  console.log("url", url);

  const searchQuery = request.url.split("?q=")[1];

  const { data } = useShopQuery({
    query: QUERY,
    variables: {
      query: searchQuery || '',
    },
    preload: true,
    cache: CacheHours(),
  });

  if (data?.products == null) {
    return <NotFound />;
  }

  const productData = flattenConnection(data.products);

  return (
    <Layout>
      <div className="mt-24 ml-auto mr-auto">
        <h3 className="text-4xl">This is search result page</h3>
        <div>{productData.length == 0 ? (<p>Cannot find product that you are looking for </p>) : null}</div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {productData?.map((pd) => (
            <li key={pd.id}>
              <SearchResult results={pd} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

const QUERY = gql`
  query products($query: String!) {
    products(first:20, query: $query){
      edges {
        cursor
        node {
          handle
          id
          images(first: 1, sortKey: POSITION) {
            edges {
              node {
                id
                url
                altText
                width
                height
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
          title
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export default Search;
