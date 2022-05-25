import React, { useState, useEffect, useRef } from "react";
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
import {
  motion,
  useMotionValue,
  useDragControls,
  useTransform,
} from "framer-motion";
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

  const [bottom, setBottom] = useState(0);
  const [constraint, setConstraint] = useState(0);
  console.log("botttom", bottom);
  console.log("constraint", constraint);
  const [t, setT] = useState(0);

  const touchStartEventHandler = (e) => {
    console.log(e);
    setTop(500);
  };

  const dragOriginY = useMotionValue(0);
  console.log("dragOriginY", dragOriginY);

  const [isDragging, setDragging] = useState(false);
  const ref = useRef(null);

  // useEffect(() => {
  //   console.log('ref.current', ref?.current.value)
  // },[])

  const dragControls = useDragControls();
  console.log("dragControls", dragControls);

  const dragEndHandler = (e, info) => {
    console.log("e", e);
    console.log("info", info);
    console.log('ref.current', ref)
    if (info.delta.y <0) {
      setConstraint(info.offset.y );
    } else if(info.delta.y === 0){
      setConstraint(info.offset.y);
    } else{
      setConstraint(0);
    }
  };

  return (
    <>
      <ProductProvider data={product} initialVariantId={initialVariant.id}>
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-x-8 ">
          <Gallery />
          <motion.div
            ref={ref}
            className="mt-5 mb-8 bg-gray-50"
            drag="y"
            dragConstraints={{ top: -500, bottom: 0 }}
            style={{ marginBottom: constraint }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            // onDragEnd={() => console.log(ref)}
            // onDragEnd={() => console.log(ref)}
            onDragEnd={dragEndHandler}
            dragControls={dragControls}
          >
            <div className="bg-gray-600 h-0.5 w-12 ml-auto mr-auto flex md:hidden lg:hidden xl:hidden"></div>
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
