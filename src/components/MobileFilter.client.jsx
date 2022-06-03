import { Fragment, useEffect } from "react";
import { FocusTrap } from "@headlessui/react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { AnimatePresence, motion, useCycle } from "framer-motion";

import { CloseIcon } from "./MobileNavigation.client";

let scrollPosition = 0;

/**
 * A client component that defines the navigation for a mobile storefront
 */

// const itemVariants = {
//   closed: {
//     opacity: 0,
//     ease: [0.6, 0.01, -0.05, 0.95],
//     transition: {
//       duration: 0.4,
//     },
//   },
//   open: {
//     opacity: 1,
//     ease: [0.6, 0.01, -0.05, 0.95],
//     transition: {
//       duration: 0.4,
//     },
//   },
// };

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const MobileFilter = ({
  isOpen,
  setIsOpen,
  filterOptions,
  filters,
  setFilters,
  onClick,
  value,
  onChange,
  checked,
  activeFilters,
}) => {
  const OpenFocusTrap = isOpen ? FocusTrap : Fragment;

  console.log('activeFilters', activeFilters)
  console.log('filters', filters)

  const [open, cycleOpen] = useCycle(false, true);

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
    <div className="lg:hidden absolute right-5">
      <AnimatePresence>
        <button
          type="button"
          className="flex justify-center items-center w-7 h-full"
          onClick={cycleOpen}
        >
          {/* <span className="sr-only">{isOpen ? "Close" : "Open"} Menu</span> */}
          {open ? "" : "Filter"}
        </button>
        {open ? (
          <motion.div
            className="transition-transform duration-500 -translate-x-0 fixed -left-0 top-0 w-full h-screen z-50 bg-gray-50 px-4 md:px-12 py-7"
            initial={{ width: 0 }}
            animate={{
              width: "100vw",
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
          >
            {filterOptions.map((t) => (
              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between px-4 py-2 text-sm font-medium text-left text-black bg-white  hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
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
                          console.log("j", j);
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
                  </>
                )}
              </Disclosure>
            ))}
            <button
              type="button"
              className="flex justify-center items-center w-7 h-full"
              onClick={cycleOpen}
            >
              <CloseIcon />
            </button>
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileFilter;
