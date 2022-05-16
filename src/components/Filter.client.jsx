import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { useParsedMetafields, Metafield } from "@shopify/hydrogen";

const Filter = ({ filterOptions, onClick, filters, setFilters }) => {
  // const [checkedProduct, setCheckedProduct] = useState([
  //   { key: "shape", value: [] },
  //   { key: "category", value: [] },
  //   { key: "quality", value: [] },
  // ]);
  // const [isChecked, setIsChecked] = useState(false);
  // const filterList = [];
  // product.map((p) => {
  //   p.metafields.edges.map((j) => {
  //     if (filterList.indexOf(j.node.key) < 0) {
  //       filterList.push(j.node);
  //     }
  //     return;
  //   });
  // });

  // let filterOptions = [];
  // filterList.map((element) => {
  //   let match = filterOptions.find((r) => r.key == element.key);
  //   if (match) {
  //   } else {
  //     filterOptions.push({ key: element.key, value: [] });
  //   }
  // });

  // filterOptions.map((item) => {
  //   filterList.map((e) => {
  //     if (e.key == item.key) {
  //       if (typeof e.value == "object") {
  //         //lets map if value is an object
  //         e.value.map((z) => {
  //           item.value.push(z);
  //         });
  //       } else {
  //         if (item.value.indexOf(e.value) < 0) {
  //           item.value.push(e.value);
  //         }
  //         return;
  //       }
  //     }
  //   });
  // });

  // console.log("filterOptions", filterOptions);

  // const checkHandler = (e) => {
  //   const targetList = checkedProduct.find((i) => {
  //     if (i.key === e.target.name) {
  //       return i.value;
  //     }
  //     return;
  //   });
  //   const targetListValue = targetList["value"];
  //   console.log("targetListValue", targetListValue);
  //   if (targetListValue.indexOf(e.target.value) > -1) {
  //     const updatedValue = targetListValue.filter((v) => v !== e.target.value);
  //     console.log("updatedValue", updatedValue);
  //     const newValue = {
  //       key: e.target.name,
  //       value: updatedValue,
  //     };
  //     console.log("newValue", newValue);
  //     const returnedValue = Object.assign(targetList, newValue);
  //     console.log("returnedValue", returnedValue);

  //     setCheckedProduct([...checkedProduct]);
  //   } else {
  //     targetListValue.splice(targetListValue.length, 0, e.target.value);
  //     const newValue = {
  //       key: e.target.name,
  //       value: targetListValue,
  //     };
  //     console.log("newValue", newValue);
  //     const returnedValue = Object.assign(targetList, newValue);
  //     console.log("returnedValue", returnedValue);
  //     setCheckedProduct([...checkedProduct]);
  //   }
  // };
  // console.log("checkedProduct", checkedProduct);
  return (
    <>
      {filterOptions.map((t) => (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-1/5 px-4 py-2 text-sm font-medium text-left text-black bg-white rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{t.key}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 w-1/5">
                {t.value.map((j) => {
                  return (
                    <div>
                      <input
                        value={j}
                        name={t.key}
                        type="checkbox"
                        className="mr-2"
                        onClick={onClick}
                      />
                      <label className="px-2">
                        <span>{j}</span>
                      </label>
                    </div>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </>
  );
};

export default Filter;
