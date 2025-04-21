"use client";

import React, { useEffect, useState } from "react";
import { AspectRatio } from "@radix-ui/themes";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";

const images = [
  "https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?&auto=format&fit=crop&w=1200&q=80",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <AspectRatio
        ratio={16 / 8}
        className="overflow-hidden rounded-2xl shadow-lg"
      >
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
        />
      </AspectRatio>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
      >
        <RxArrowLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
      >
        <RxArrowRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              currentIndex === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
