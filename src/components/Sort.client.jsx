import React, { useState, useEffect } from "react";
import { flattenConnection } from "@shopify/hydrogen/client";
import gql from "graphql-tag";

import ProductCard from "./ProductCard";
import Filter from "./Filter.client";
import MobileFilter from "./MobileFilter.client";

const Sort = ({ collection }) => {
  console.log("collection", collection);
  const defaultProducts = collection.defaultQuery.edges.map(
    (edge) => edge.node
  ); //default

  const products = collection.titleQuery.edges.map((edge) => edge.node);
  const titleProduct = collection.titleQuery.edges.map((edge) => edge.node); //A to Z
  const titleZToAProduct = collection.titleQuery.edges
    .map((edge) => edge.node)
    .sort()
    .reverse(); // Z to A
  const priceProduct = collection.priceQuery.edges.map((edge) => edge.node); //price low to high
  const priceProductHighToLow = collection.priceQuery.edges
    .map((edge) => edge.node)
    .reverse(); // price high to low
  const bestsellingProduct = collection.bestsellingQuery.edges.map(
    (edge) => edge.node
  ); //best selling

  // typeof window !== 'undefined' ? localStorage.setItem("products", JSON.stringify(products)): '';

  // sort product options
  const options = [
    { label: "Sort", value: "sort", id: 6 },
    { label: "price low to high", value: "price low to high", id: "1" },
    { label: "price high to low", value: "price high to low", id: "2" },
    { label: "best selling", value: "best selling", id: "3" },
    { label: "alphabetically A to Z", value: "alphabetically A to Z", id: "4" },
    { label: "alphabetically Z to A", value: "alphabetically Z to A", id: "5" },
  ];

  const [value, setValue] = useState("price low to high");
  const [product, setProduct] = useState(defaultProducts);

  console.log("product", product);
  // const sortedProducts = [...product]

  // handle sort product change
  const handleChange = (e) => {
    console.log(e.target.value);
    switch (e.target.value) {
      case "alphabetically A to Z":
        return setProduct(titleProduct);
      case "alphabetically Z to A":
        return setProduct(titleZToAProduct);
      case "price low to high":
        return setProduct(priceProduct);
      case "price high to low":
        return setProduct(priceProductHighToLow);
      case "best selling":
        return setProduct(bestsellingProduct);
      case "sort":
        return setProduct(defaultProducts);
      default:
        return null;
    }
  };

  const filterOptions = [
    { key: "shape", value: ["Panda", "Dog", "Monkey", "Bird"] },
    { key: "category", value: ["Toy"] },
    { key: "quality", value: ["Premium"] },
  ];

  const [filters, setFilters] = useState({
    shape: [],
    quality: [],
    category: [],
  });

  const [haveValue, setHaveValue] = useState(false);

  const newFilters = { ...filters };

  let list2 = [];
  const test2 = Object.entries(newFilters).filter(([key, value]) => {
    if (newFilters[key].length > 0) {
      list2.push(value);
      return list2;
    }
  });
  const activeFilters = list2.flat(); //CORRECT
  console.log("activeFilters", activeFilters);
  console.log("newFilters", newFilters);

  let array = [];

  const clickFilterHandler = (e) => {
    Object.entries(filters).map(([key, value]) => {
      console.log("key", key);
      console.log("value", value);
      if (key === e.target.name) {
        if (value.indexOf(e.target.value) < 0) {
          value.push(e.target.value);
          newFilters[e.target.name] = value;
        } else {
          const targetIndex = value.findIndex((v) => v === e.target.value);
          value.splice(targetIndex, 1);
          newFilters[e.target.name] = value;
        }
        setFilters(newFilters);
        console.log(value);
      }
    });
  };

  return (
    <div>
      <div>
        <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6 text-center">
          {collection.title}
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5">
        <div className="col-span-1">
          <div className="mt-12">
            <Dropdown
              selectedOption={value}
              options={options}
              value={value}
              onChange={handleChange}
            />
            <Filter
              filterOptions={filterOptions}
              filters={filters}
              setFilters={setFilters}
              onClick={clickFilterHandler}
            />
            <MobileFilter filterOptions={filterOptions}
              filters={filters}
              setFilters={setFilters}
              onClick={clickFilterHandler} />
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
          <div>
            <p className="text-sm text-gray-500 mt-5 mb-5 text-center">
              {products.length} {products.length > 1 ? "products" : "product"}
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {activeFilters.length > 0 &&
                product
                  .filter((pd) => {
                    return Object.entries(pd).find(([key, value]) =>
                      activeFilters.includes(pd[key]?.value)
                    );
                  })
                  .map((product) => (
                    <li key={product.id}>
                      <ProductCard
                        product={product}
                        titleProduct={titleProduct}
                        priceProduct={priceProduct}
                      />
                    </li>
                  ))}
              {activeFilters.length === 0 &&
                product.map((product) => (
                  <li key={product.id}>
                    <ProductCard
                      product={product}
                      titleProduct={titleProduct}
                      priceProduct={priceProduct}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Dropdown = ({
  label,
  value,
  options,
  onChange,
  selectedOption,
}) => {
  return (
    <div>
      <label>
        {label}
        <select onChange={onChange}>
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Sort;
