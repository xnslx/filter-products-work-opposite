import React, { useState, useEffect } from "react";
import { motion, useViewportScroll, useAnimation } from "framer-motion";

const HeaderAnimation = ({ children }) => {
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
    <div>
      <motion.div
        className="fixed top-0 left-0 w-screen h-20 origin-top-left bg-green-700"
        animate={{ scaleX: yProgress }}
        transition={{ duration: 0.2 }}
      />
      {children}
    </div>
  );
};

export default HeaderAnimation;
