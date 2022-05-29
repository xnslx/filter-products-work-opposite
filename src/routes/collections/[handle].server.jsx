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
import FeaturedCollection from "../../components/FeaturedCollection";

export default function Collection({
  country = { isoCode: "US" },
  collectionProductCount = 24,
  params,
}) {
  const { languageCode } = useShop();

  const { handle } = params;
  console.log("handle", handle);
  const { data } = useShopQuery({
    query: COLLECTION_QUERY,
    variables: {
      handle,
    },
    preload: true,
  });

  console.log('data',data)

  if (data?.collection == null) {
    return <NotFound />;
  }
  // console.log("data", data.collectionInfo.nodes);
  const collection = data.collection
  const hasNextPage = collection.defaultQuery.pageInfo.hasNextPage;

  console.log("handleserver.jsx", collection);

  return (
    <Layout>
      {/* the seo object will be expose in API version 2022-04 or later */}
      <Seo type="collection" data={collection} />
      <Sort collection={collection} />
      {hasNextPage && (
        <LoadMoreProducts startingCount={collectionProductCount} />
      )}
    </Layout>
  );
}

// const COLLECTION_QUERY = gql`
//   query COLLECTION_QUERY
//   {
//     collectionInfo:collections(first:10){
//       ...collectionQuery
//     }
//   }

//   fragment productQuery on ProductConnection {
//     pageInfo {
//       hasNextPage
//     }
//     edges {
//       node {
//         tags
//         shape: metafield(namespace: "my_fields", key:"shape"){
//           value
//         }
//         category: metafield(namespace: "my_fields", key:"category"){
//           value
//         }
//         quality: metafield(namespace: "my_fields", key:"quality"){
//           value
//         }
//         title
//         vendor
//         handle
//         descriptionHtml
//         compareAtPriceRange {
//           maxVariantPrice {
//             currencyCode
//             amount
//           }
//           minVariantPrice {
//             currencyCode
//             amount
//           }
//         }
//         variants(first: 1) {
//           edges {
//             node {
//               id
//               title
//               availableForSale
//               image {
//                 id
//                 url
//                 altText
//                 width
//                 height
//               }
//               priceV2 {
//                 currencyCode
//                 amount
//               }
//               compareAtPriceV2 {
//                 currencyCode
//                 amount
//               }
//             }
//           }
//         }
//       }
//     }
//   }

//   fragment collectionQuery on CollectionConnection{
//     nodes {
//       id
//       handle
//       title
//       defaultQuery: products(first:10) {
//         ...productQuery
//       }
//       titleQuery: products(first:10, sortKey:TITLE) {
//         ...productQuery
//       }
//       priceQuery: products(first:10, sortKey:PRICE) {
//         ...productQuery
//       }
//       bestsellingQuery: products(first:10, sortKey:BEST_SELLING) {
//         ...productQuery
//       }
//     }
//   }
// `;

const COLLECTION_QUERY = gql`
  query collectionByHandle($handle: String!) {
    collection(handle: $handle){
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
`;
