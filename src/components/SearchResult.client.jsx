import React, { useState, useEffect } from "react";
import { Image } from "@shopify/hydrogen/client";
import { ProductPrice } from "@shopify/hydrogen";

const SearchResult = (results) => {
  console.log("results", results);
  console.log("firing");
  return (
    <div>
      <Image data={results.results.images.edges[0].node} />
      <h1 className="text-lg">{results.results.title}</h1>
      <h3>{results.results.priceRange.minVariantPrice.amount}</h3>
    </div>

    // <div>
    //   {results.results.map((rs) => {
    //     <li>{rs.title}</li>;
    //   })}
    // </div>
  );
};

export default SearchResult;
