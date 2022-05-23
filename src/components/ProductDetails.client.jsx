import React, { useState } from "react";
import {
  flattenConnection,
  useProduct,
  useParsedMetafields,
  ProductProvider,
  ProductTitle,
  ProductDescription,
  ProductPrice,
  AddToCartButton,
  BuyNowButton,
} from "@shopify/hydrogen/client";
import { motion } from "framer-motion";
import ProductOptions from "./ProductOptions.client";
import Gallery from "./Gallery.client";
import {
  BUTTON_PRIMARY_CLASSES,
  BUTTON_SECONDARY_CLASSES,
} from "./Button.client";

function AddToCartMarkup() {
  const { selectedVariant } = useProduct();
  const isOutOfStock = !selectedVariant.availableForSale;

  return (
    <div className="space-y-2 mb-8">
      <AddToCartButton
        className={BUTTON_PRIMARY_CLASSES}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? "Out of stock" : "Add to bag"}
      </AddToCartButton>
      {isOutOfStock ? (
        <p className="text-black text-center">Available in 2-3 weeks</p>
      ) : (
        <BuyNowButton
          variantId={selectedVariant.id}
          className={BUTTON_SECONDARY_CLASSES}
        >
          Buy it now
        </BuyNowButton>
      )}
    </div>
  );
}

function SizeChart() {
  return (
    <>
      <h3
        className="text-xl text-black font-semibold mt-8 mb-4"
        id="size-chart"
      >
        Size Chart
      </h3>
      <table className="min-w-full table-fixed text-sm text-center bg-white">
        <thead>
          <tr className="bg-black text-white">
            <th className="w-1/4 py-2 px-4 font-normal">Board Size</th>
            <th className="w-1/4 py-2 px-4 font-normal">154</th>
            <th className="w-1/4 py-2 px-4 font-normal">158</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border border-black">Weight Range</td>
            <td className="p-3 border border-black">120-180 lbs. /54-82kg</td>
            <td className="p-3 border border-black">150-200 lbs. /68-91 kg</td>
          </tr>
          <tr>
            <td className="p-3 border border-black">Waist Width</td>
            <td className="p-3 border border-black">246mm</td>
            <td className="p-3 border border-black">255mm</td>
          </tr>
          <tr>
            <td className="p-3 border border-black">Stance Width</td>
            <td className="p-3 border border-black">-40</td>
            <td className="p-3 border border-black">-40</td>
          </tr>
          <tr>
            <td className="p-3 border border-black">Binding Sizes</td>
            <td className="p-3 border border-black">
              Men&rsquo;s S/M, Women&rsquo;s S/M
            </td>
            <td className="p-3 border border-black">
              Men&rsquo;s L, Women&rsquo;s L
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default function ProductDetails({ product }) {
  const initialVariant = flattenConnection(product.variants)[0];

  const productMetafields = useParsedMetafields(product.metafields);
  const sizeChartMetafield = productMetafields.find(
    (metafield) =>
      metafield.namespace === "my_fields" && metafield.key === "size_chart"
  );
  const sustainableMetafield = productMetafields.find(
    (metafield) =>
      metafield.namespace === "my_fields" && metafield.key === "sustainable"
  );
  const lifetimeWarrantyMetafield = productMetafields.find(
    (metafield) =>
      metafield.namespace === "my_fields" &&
      metafield.key === "lifetime_warranty"
  );

  const [top, setTop] = useState(0);

  const touchStartEventHandler = (e) => {
    console.log(e);
    setTop(500);
  };

  return (
    <>
      <ProductProvider data={product} initialVariantId={initialVariant.id}>
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-x-8">
          <Gallery />
          <motion.div
            className="mt-5 mb-8 bg-gray-50 border-t border-gray-400"
            drag="y"
            dragConstraints={{ top: -500, bottom: 0 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          >
            <ProductTitle
              as="h1"
              className="text-lg uppercase font-bold text-black mb-4 mt-8"
            />
            {product.vendor && (
              <div className="text-sm font-medium mb-2 text-gray-900">
                {product.vendor}
              </div>
            )}
            <span />
            <div className="flex justify-between md:block">
              <ProductPrice
                className="text-gray-500 line-through text-lg font-semibold"
                priceType="compareAt"
                variantId={initialVariant.id}
              />
              <ProductPrice
                className="text-gray-900 text-lg font-semibold"
                variantId={initialVariant.id}
              />
            </div>
            <ProductOptions />
            {sizeChartMetafield?.value && (
              <a
                href="#size-chart"
                className="block underline text-gray-500 text-sm tracking-wide my-4"
              >
                Size Chart
              </a>
            )}
            <AddToCartMarkup />
            <ProductDescription className="prose border-t border-gray-200 pt-6 text-black text-md" />
          </motion.div>

          <div>
            {/* <div className="hidden md:block">
              <ProductTitle
                as="h1"
                className="text-lg uppercase font-bold text-black mb-4"
              />
              {product.vendor && (
                <div className="text-sm font-medium mb-2 text-gray-900">
                  {product.vendor}
                </div>
              )}
              <ProductPrice
                className="text-gray-500 line-through text-lg font-semibold"
                priceType="compareAt"
                variantId={initialVariant.id}
              />
              <ProductPrice
                className="text-gray-900 text-lg font-semibold"
                variantId={initialVariant.id}
              />
            </div> */}
            {/* <div className="mt-8">
              <ProductOptions />
              {sizeChartMetafield?.value && (
                <a
                  href="#size-chart"
                  className="block underline text-gray-500 text-sm tracking-wide my-4"
                >
                  Size Chart
                </a>
              )}
              <AddToCartMarkup />
            </div> */}
            {/* <ProductDescription className="prose border-t border-gray-200 pt-6 text-black text-md" /> */}
            {/* {sizeChartMetafield?.value && (
              <div className="border-t border-gray-200">
                <SizeChart />
              </div>
            )} */}
          </div>
        </div>
      </ProductProvider>
    </>
  );
}
