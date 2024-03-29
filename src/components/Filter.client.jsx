import React, { useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

const Filter = ({
  filterOptions,
  onClick,
  filters,
  setFilters,
  checked,
  onChange,
  value,
  activeFilters,
}) => {
  return (
    <div className="mt-12 hidden md:block lg:block xl:block">
      {filterOptions.map((t, index) => (
        <Disclosure key={index}>
          {({ open }) => (
            <div>
              <Disclosure.Button className="flex w-full justify-between px-4 py-2 text-sm font-medium text-left text-black bg-white rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{t.key}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 ">
                  {t.value.map((j, index) => {
                    return (
                      <div key={index}>
                        <input
                          value={j}
                          name={t.key}
                          type="checkbox"
                          className="mr-2"
                          onClick={onClick}
                          onChange={onChange}
                          checked={activeFilters.includes(j)}
                        />
                        <label className="px-2">
                          <span>{j}</span>
                        </label>
                      </div>
                    );
                  })}
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default Filter;
