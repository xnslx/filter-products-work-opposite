// import { useProduct, MediaFile, Image } from "@shopify/hydrogen/client";

// /**
//  * A client component that defines a media gallery for hosting images, 3D models, and videos of products
//  */
// export default function Gallery() {
//   const { media, selectedVariant } = useProduct();

//   const featuredMedia = selectedVariant.image || media[0]?.image;
//   const featuredMediaSrc = featuredMedia?.url.split("?")[0];
//   const galleryMedia = media.filter((med) => {
//     if (
//       med.mediaContentType === MODEL_3D_TYPE ||
//       med.mediaContentType === VIDEO_TYPE ||
//       med.mediaContentType === EXTERNAL_VIDEO_TYPE
//     ) {
//       return true;
//     }

//     return !med.image.url.includes(featuredMediaSrc);
//   });

//   console.log('galleryMedia',galleryMedia)

//   const media = galleryMedia?.map(i => i.image)
//   const mediaByIndex = index => media[index % media.length];

//   if (!media.length) {
//     return null;
//   }

//   return (
//       <div
//         className="gap-4 flex md:grid md:grid-cols-2 overflow-x-scroll no-scrollbar scroll-snap-x scroll-smooth h-[485px] md:h-auto place-content-start grid grid-cols-2"
//         tabIndex="-1"
//       >
//         <Image
//           data={selectedVariant.image}
//           className="w-[80vw] md:w-full h-full md:h-auto object-cover object-center flex-shrink-0 md:flex-shrink-none snap-start md:col-span-2 border border-gray-200 rounded-lg"
//         />
//         {galleryMedia.map((med) => {
//           let extraProps = {};

//           if (med.mediaContentType === MODEL_3D_TYPE) {
//             extraProps = MODEL_3D_PROPS;
//           }

//           return (
//             <MediaFile
//               tabIndex="0"
//               key={med.id || med.image.id}
//               className="w-[80vw] md:w-auto h-full md:h-auto object-cover object-center transition-all snap-start border border-gray-200 flex-shrink-0 rounded-lg threes:col-span-2"
//               data={med}
//               options={{
//                 height: "485",
//                 crop: "center",
//               }}
//               {...extraProps}
//             />
//           );
//         })}
//       </div>
//   );
// }

// const MODEL_3D_TYPE = "MODEL_3D";
// const MODEL_3D_PROPS = {
//   interactionPromptThreshold: "0",
// };
// const VIDEO_TYPE = "VIDEO";
// const EXTERNAL_VIDEO_TYPE = "EXTERNAL_VIDEO";

import { useProduct, MediaFile, Image } from "@shopify/hydrogen/client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { Thumb } from "./EmblaCarouselThumb.client";

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportRef, embla] = useEmblaCarousel(
    {
      axis: "y",
      skipSnaps: false,
    },
    [WheelGesturesPlugin({ forceWheelAxis: "y" })]
  );

  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel(
    {
      axis: "y",
      selectedClass: "",
      dragFree: true,
    },
    [WheelGesturesPlugin({ forceWheelAxis: "y" })]
  );

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    embla.on("scroll", onScroll);
    onSelect();
  }, [embla, onSelect, onScroll]);
  const { media, selectedVariant } = useProduct();

  const featuredMedia = selectedVariant.image || media[0]?.image;
  const featuredMediaSrc = featuredMedia?.url.split("?")[0];
  const galleryMedia = media.filter((med) => {
    if (
      med.mediaContentType === MODEL_3D_TYPE ||
      med.mediaContentType === VIDEO_TYPE ||
      med.mediaContentType === EXTERNAL_VIDEO_TYPE
    ) {
      return true;
    }

    return !med.image.url.includes(featuredMediaSrc);
  });

  console.log("galleryMedia", galleryMedia);

  const M = galleryMedia?.map((i) => i.image);
  const mediaByIndex = (index) => M[index % M.length];
  const SLIDE_COUNT = M.length;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  if (!media.length) {
    return null;
  }

  // return (
  //   <div
  //     className="gap-4 flex md:grid md:grid-cols-2 overflow-x-scroll no-scrollbar scroll-snap-x scroll-smooth h-[485px] md:h-auto place-content-start grid grid-cols-2"
  //     tabIndex="-1"
  //   >
  //     <Image
  //       data={selectedVariant.image}
  //       className="w-[80vw] md:w-full h-full md:h-auto object-cover object-center flex-shrink-0 md:flex-shrink-none snap-start md:col-span-2 border border-gray-200 rounded-lg"
  //     />
  //     {galleryMedia.map((med) => {
  //       let extraProps = {};

  //       if (med.mediaContentType === MODEL_3D_TYPE) {
  //         extraProps = MODEL_3D_PROPS;
  //       }

  //       return (
  //         <MediaFile
  //           tabIndex="0"
  //           key={med.id || med.image.id}
  //           className="w-[80vw] md:w-auto h-full md:h-auto object-cover object-center transition-all snap-start border border-gray-200 flex-shrink-0 rounded-lg threes:col-span-2"
  //           data={med}
  //           options={{
  //             height: "485",
  //             crop: "center",
  //           }}
  //           {...extraProps}
  //         />
  //       );
  //     })}
  //   </div>
  // );
  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {galleryMedia.map((med) => {
            let extraProps = {};

            if (med.mediaContentType === MODEL_3D_TYPE) {
              extraProps = MODEL_3D_PROPS;
            }

            return (
              <MediaFile
                tabIndex="0"
                key={med.id || med.image.id}
                className="w-[80vw] md:w-auto h-full md:h-auto object-cover object-center transition-all snap-start border border-gray-200 flex-shrink-0 threes:col-span-2"
                data={med}
                options={{
                  height: "485",
                  crop: "center",
                }}
                {...extraProps}
              />
            );
          })}
        </div>
      </div>
      <div className="embla__progress">
        <div
          className="embla__progress__bar"
          style={{ transform: `translateX(${scrollProgress}%)` }}
        />
      </div>
      <div className="embla embla--thumb">
        <div className="embla__viewport" ref={thumbViewportRef}>
          <div className="embla__container__carousel embla__container--thumb">
            {galleryMedia.map((m, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgSrc={mediaByIndex(index)}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const MODEL_3D_TYPE = "MODEL_3D";
const MODEL_3D_PROPS = {
  interactionPromptThreshold: "0",
};
const VIDEO_TYPE = "VIDEO";
const EXTERNAL_VIDEO_TYPE = "EXTERNAL_VIDEO";
