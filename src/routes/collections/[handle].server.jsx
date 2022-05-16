import {
  useShop,
  useShopQuery,
  flattenConnection,
  Seo,
} from "@shopify/hydrogen";
import gql from "graphql-tag";

import LoadMoreProducts from "../../components/LoadMoreProducts.client";
import Layout from "../../components/Layout.server";
import ProductCard from "../../components/ProductCard";
import NotFound from "../../components/NotFound.server";
import Sort from "../../components/Sort.client";

export default function Collection({
  country = { isoCode: "US" },
  collectionProductCount = 24,
  params,
}) {
  const { languageCode } = useShop();

  const { handle } = params;
  const { data } = useShopQuery({
    query: COLLECTION_QUERY,
  });

  if (data?.collectionInfo == null) {
    return <NotFound />;
  }

  const collection = data.collectionInfo.nodes[0];
  const hasNextPage = collection.defaultQuery.pageInfo.hasNextPage;

  return (
    <Layout>
      {/* the seo object will be expose in API version 2022-04 or later */}
      <Seo type="collection" data={collection} />
      <Sort collection={collection} />

      {/* <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
        {collection.title}
      </h1> */}
      {/* <div
        dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
        className="text-lg"
      /> */}
      {/* <p className="text-sm text-gray-500 mt-5 mb-5">
        {products.length} {products.length > 1 ? "products" : "product"}
      </p> */}
      {/* <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              titleProduct={titleProduct}
              priceProduct={priceProduct}
            />
          </li>
        ))}
      </ul> */}
      {hasNextPage && (
        <LoadMoreProducts startingCount={collectionProductCount} />
      )}
    </Layout>
  );
}

const COLLECTION_QUERY = gql`
  query COLLECTION_QUERY
  {
    collectionInfo:collections(first:10){
      ...collectionQuery
    }
  }
  
  fragment productQuery on ProductConnection {
    pageInfo {
      hasNextPage
    }
    edges {
      node {
        tags
        shape: metafield(namespace: "my_fields", key:"shape"){
          value
        }
        category: metafield(namespace: "my_fields", key:"category"){
          value
        }
        quality: metafield(namespace: "my_fields", key:"quality"){
          value
        }
        title
        vendor
        handle
        descriptionHtml
        compareAtPriceRange {
          maxVariantPrice {
            currencyCode
            amount
          }
          minVariantPrice {
            currencyCode
            amount
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              title
              availableForSale
              image {
                id
                url
                altText
                width
                height
              }
              priceV2 {
                currencyCode
                amount
              }
              compareAtPriceV2 {
                currencyCode
                amount
              }
            }
          }
        }
      }
    }
  }
  
  fragment collectionQuery on CollectionConnection{
    nodes {
      id
      handle
      title
      defaultQuery: products(first:10) {
        ...productQuery
      }
      titleQuery: products(first:10, sortKey:TITLE) {
        ...productQuery
      }
      priceQuery: products(first:10, sortKey:PRICE) {
        ...productQuery
      }
      bestsellingQuery: products(first:10, sortKey:BEST_SELLING) {
        ...productQuery
      }
    }
  }
`;
