import React from "react";

export const Thumb = ({ selected, onClick, imgSrc }) => {
  console.log('imgSrc',imgSrc)
  return (
    <div
      className={`embla__slide embla__slide--thumb ${
        selected ? "is-selected" : ""
      }`}
    >
      <button
        onClick={onClick}
        className="embla__slide__inner embla__slide__inner--thumb"
        type="button"
      >
        <img
          className="embla__slide__thumbnail"
          src={imgSrc.url}
          alt="A cool cat."
        />
      </button>
    </div>
  );
};
