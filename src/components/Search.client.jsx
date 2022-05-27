// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "@shopify/hydrogen/client";
// import clsx from "clsx";

// import SearchIcon from "./SearchIcon";
// import SearchResult from "./SearchResult.client";

// // Hook
// const useClickOutside = (handler) => {
//   let domNode = useRef();

//   useEffect(() => {
//     let maybeHandler = (event) => {
//       if (!domNode.current.contains(event.target)) {
//         handler();
//       }
//     };

//     document.addEventListener("mousedown", maybeHandler);

//     return () => {
//       document.removeEventListener("mousedown", maybeHandler);
//     };
//   });

//   return domNode;
// };

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [productData, setProductData] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const inputRef = useRef(null);

//   const handleChange = (e) => {
//     e.preventDefault();
//     setQuery(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
//   };

//   let timer;

//   const findProduct = (e) => {
//     console.log("i am firing");
//     e.preventDefault();

//     timer = setTimeout(() => {
//       if (typeof window !== "undefined" && localStorage.getItem("products")) {
//         setProductData(JSON.parse(localStorage.getItem("products")));
//         const form = inputRef.current;
//         const formData = new FormData(form);
//         const text = formData.get("q");
//         // form.action = `/search?${text}`;
//         navigate(`/search?q=${text}`, { replace: true, reloadDocument: true });
//         setModalOpen(false);
//       }
//       return;
//     }, 500);
//     return () => clearTimeout(timer);
//   };

//   const result = productData.filter((pd) => pd.title.includes(query));
//   console.log(result);
//   // typeof window !== "undefined"
//   //   ? localStorage.setItem("result_products", JSON.stringify(result))
//   //   : "";

//   const handleKeyDown = (e) => {
//     e.preventDefault();
//     if (e.key === "Enter") {
//       const form = inputRef.current;
//       const formData = new FormData(form);
//       const text = formData.get("q");
//       // form.action = `/search?${text}`;
//       navigate(`/search?${text}`, { replace: true });
//       // form.submit();
//       findProduct();
//     }
//   };

//   const clickHandler = () => {
//     console.log("firing");
//     setModalOpen(true);
//   };

//   let domNode = useClickOutside(() => {
//     setModalOpen(false);
//   });

//   return (
//     <div>
//       <div>
//         <div
//           className={`z-50 fixed top-0 bottom-0 left-0 right-0 bg-black transition-opacity duration-300 ${
//             modalOpen ? "opacity-20" : "opacity-0 pointer-events-none"
//           }`}
//         />
//         <div
//           ref={domNode}
//           className={clsx([
//             "z-50 pointer-events-none z-50 h-full fixed right-0 top-0 bottom-0 flex flex-col w-full transition-transform duration-500 transform-gpu",
//             modalOpen ? "translate-y-0" : "-translate-y-full",
//           ])}
//         >
//           <div className="overflow-hidden h-1/6 pointer-events-auto bg-white">
//             <form
//               onSubmit={findProduct}
//               action="/search"
//               ref={inputRef}
//               className="mt-8"
//             >
//               <div className="border border-2 w-3/5 ml-auto mr-auto h-1/5">
//                 <input
//                   className="w-full ml-auto mr-auto h-1/5"
//                   type="text"
//                   value={query}
//                   onChange={handleChange}
//                   name="q"
//                   // onKeyDown={handleKeyDown}
//                   tabIndex="-1"
//                 />
//               </div>
//             </form>
//             <button
//               onClick={() => setModalOpen(false)}
//               className="absolute right-0 top-0 mr-4 pt-4"
//             >
//               X
//             </button>
//           </div>
//         </div>
//       </div>
//       <button onClick={clickHandler}>
//         <SearchIcon />
//       </button>
//     </div>
//   );
// };

// export default Search;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, fetchSync } from "@shopify/hydrogen/client";
import clsx from "clsx";

import SearchIcon from "./SearchIcon";
import SearchResult from "./SearchResult.client";

// Hook
const useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const navigate = useNavigate();

  const inputRef = useRef(null);

  // useEffect(() => {
  //   axios
  //     .get(`/search/suggest?q=${query}`)
  //     .then((res) => {
  //       console.log("res", res);
  //     })
  //     .catch((err) => console.error(err));
  // }, [query]);

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
  };

  const findProduct = (e) => {
    console.log("i am firing");
    e.preventDefault();
    // axios
    //   .post(`/search/suggest?q=${query}`)
    //   .then((res) => {
    //     console.log("res", res);
    //   })
    //   .catch((err) => console.error(err));

    fetch(`/search?q=${query}`, {
      method: "POST", // or 'PUT'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setProductData(data);
        setFetchData(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const form = inputRef.current;
    const formData = new FormData(form);
    const text = formData.get("q");
    navigate(`/search?q=${text}`, { replace: true });
    setModalOpen(false);
    window.location.reload();
  };

  const clickHandler = () => {
    console.log("firing");
    setModalOpen(true);
  };

  let domNode = useClickOutside(() => {
    setModalOpen(false);
  });

  return (
    <div className="px-4">
      <div>
        <div
          className={`z-50 fixed top-0 bottom-0 left-0 right-0 bg-black transition-opacity duration-300 ${
            modalOpen ? "opacity-20" : "opacity-0 pointer-events-none"
          }`}
        />
        <div
          ref={domNode}
          className={clsx([
            "z-50 pointer-events-none z-50 h-full fixed right-0 top-0 bottom-0 flex flex-col w-full transition-transform duration-500 transform-gpu",
            modalOpen ? "translate-y-0" : "-translate-y-full",
          ])}
        >
          <div className="overflow-hidden h-1/6 pointer-events-auto bg-white">
            <form
              onSubmit={findProduct}
              action="/search"
              ref={inputRef}
              className="mt-8"
            >
              <div className="border border-2 w-3/5 ml-auto mr-auto h-1/5 py-1">
                <input
                  className="w-full ml-auto mr-auto h-1/5"
                  type="text"
                  value={query}
                  onChange={handleChange}
                  name="q"
                  // onKeyDown={handleKeyDown}
                  tabIndex="-1"
                />
              </div>
            </form>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-0 top-0 mr-4 pt-4"
            >
              X
            </button>
          </div>
        </div>
      </div>
      <button onClick={clickHandler} className="">
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;
