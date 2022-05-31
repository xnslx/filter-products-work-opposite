import { Fragment, useEffect } from "react";
import { FocusTrap } from "@headlessui/react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

import { CloseIcon } from "./MobileNavigation.client";

let scrollPosition = 0;

/**
 * A client component that defines the navigation for a mobile storefront
 */

const MobileFilter = ({
  isOpen,
  setIsOpen,
  filterOptions,
  filters,
  setFilters,
  onClick,
}) => {
  const OpenFocusTrap = isOpen ? FocusTrap : Fragment;

  useEffect(() => {
    if (isOpen) {
      scrollPosition = window.scrollY;
      document.body.style.position = "fixed";
    } else if (document.body.style.position) {
      document.body.style.position = "";
      window.scrollTo(0, scrollPosition);
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <OpenFocusTrap>
        <button
          type="button"
          className="flex justify-center items-center w-7 h-full"
          onClick={() => setIsOpen((previousIsOpen) => !previousIsOpen)}
        >
          <span className="sr-only">{isOpen ? "Close" : "Open"} Menu</span>
          {isOpen ? <CloseIcon /> : "Filter"}
        </button>
        {isOpen ? (
          <div className="fixed -left-0 top-20 w-full h-screen z-10 bg-gray-50 px-4 md:px-12 py-7">
            {filterOptions.map((t) => (
              <Disclosure>
                {({ open }) => (
                  <>
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
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
            <button
              type="button"
              className="flex justify-center items-center w-7 h-full"
              onClick={() => setIsOpen((previousIsOpen) => !previousIsOpen)}
            >
              <CloseIcon />
            </button>
          </div>
        ) : (
          ""
        )}
      </OpenFocusTrap>
    </div>
  );
};

export default MobileFilter;
