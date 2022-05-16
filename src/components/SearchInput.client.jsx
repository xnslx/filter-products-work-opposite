import React, { useState, useEffect } from "react";
import { useServerProps } from "@shopify/hydrogen/client";

const SearchInput = ({ searchQuery }) => {
  const [query, setQuery] = useState("");
  const { setServerProps, pending } = useServerProps();

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    setServerProps(searchQuery);
  };

  const findProduct = () => {
    console.log("firing");
  };

  return (
    <form onSubmit={findProduct}>
      <div className="border border-2">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          // onKeyDown={handleKeyDown}
        />
      </div>
    </form>
  );
};

export default SearchInput;
