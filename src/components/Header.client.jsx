import { useEffect, useState } from "react";
import { Link } from "@shopify/hydrogen/client";
import { motion, useViewportScroll, useAnimation } from "framer-motion";

import CartToggle from "./CartToggle.client";
import { useCartUI } from "./CartUIProvider.client";
import CountrySelector from "./CountrySelector.client";
import Navigation from "./Navigation.client";
import MobileNavigation from "./MobileNavigation.client";
import Search from "./Search.client";
// import HeaderAnimation from "./HeaderAnimation.client";

/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({ collections, storeName }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const { isCartOpen } = useCartUI();

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    setScrollbarWidth(scrollbarWidth);
  }, [isCartOpen]);

  /* Hook for scroll y */
  const { scrollYProgress } = useViewportScroll();
  console.log("scrollYProgress", scrollYProgress);
  /* State for progress */
  const [yProgress, setYProgress] = useState(false);

  /* trigger when scroll is updated */
  useEffect(() => {
    return scrollYProgress.onChange((p) => setYProgress(p));
  }, [scrollYProgress]);

  return (
    <header className="h-24 " role="banner">
      <div
        className={`fixed z-20 h-24 w-full border-b border-gray-200 px-6 md:px-8 md:py-6 lg:pt-8 lg:pb-0 mx-auto ${
          isMobileNavOpen ? "" : "bg-opacity-95"
        }`}
      >
        <motion.div
          className="fixed top-0 left-0 w-screen h-24  origin-top-left bg-yellow-400"
          animate={{ scaleX: yProgress }}
          transition={{ duration: 0.2 }}
        />
        <div
          className="h-full flex lg:flex-col place-content-between"
          style={{
            paddingRight: isCartOpen ? scrollbarWidth : 0,
          }}
        >
          <div className="relative text-center w-full flex justify-between items-center">
            {/* <CountrySelector /> */}
            <Navigation collections={collections} storeName={storeName} />
            <MobileNavigation
              collections={collections}
              isOpen={isMobileNavOpen}
              setIsOpen={setIsMobileNavOpen}
            />
            <Link
              className="font-black uppercase text-3xl tracking-widest"
              to="/"
            >
              {storeName}
            </Link>
            <div className="flex items-center">
              <Search />
              <CartToggle
                handleClick={() => {
                  if (isMobileNavOpen) setIsMobileNavOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
