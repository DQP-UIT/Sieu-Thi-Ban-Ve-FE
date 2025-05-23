"use client";

import ImageSlider from "@/components/ui/image-slider";
import { RxArrowRight, RxComponent2 } from "react-icons/rx";
import React from "react";
import ContactCard from "@/components/contact-card";

const images = [
  "https://i.pinimg.com/736x/0f/f0/ac/0ff0ac7f874321bcfda7fa4a10368ed5.jpg",
  "https://i.pinimg.com/736x/b5/a0/b8/b5a0b8ec56aed5829fe9b99f7a7d6d0b.jpg",
  "https://i.pinimg.com/736x/90/e0/f6/90e0f69adb184557815264ba560dcb17.jpg",
];

const HomePage = () => {

  return (
    <div className="flex flex-wrap">
      <div className="w-full h-full md:grid md:grid-cols-3 flex flex-wrap">
        <div className="w-full md:col-start-1 items-start pl-4">
          <span className="text-4xl font-serif">
            Get your perfect design for your dreaming house
          </span>
          <div className="text-lg font-mono text-gray-500 mt-4">
            Welcome to DesignsRepo, your ultimate destination for inspiring and
            innovative house design blueprints. Explore, customize, and create
            the perfect foundation for your dream home with us!
          </div>
          <div className="mt-10 sm:mt-10 flex flex-wrap text-lg text-black font-bold gap-2 sm:gap-4">
            <div className="px-6 py-2 flex flex-wrap items-center gap-4 bg-white rounded-lg hover:bg-white/80 select-none">
              <span>Get started</span>
              <RxArrowRight size={24} />
            </div>
            <div className="px-6 py-2 flex flex-wrap items-center gap-4 bg-blue-400/80 rounded-lg hover:bg-blue-400 select-none">
              <RxComponent2 size={24} />
              <span>Contact us</span>
            </div>
          </div>
        </div>
        <div className="w-full h-fit md:col-start-2 col-span-2 mt-2">
          <ImageSlider images={images} />
        </div>
      </div>
      {/* About */}
      <div className="w-full mt-2 md:mt-20">
        <div className="w-full">
          <div className="flex-start text-3xl font-semibold mb-2">About us</div>
          <div className="w-full text-xl md:w-2/3">
            At DesignsRepo, we are passionate about turning dreams into reality.
            Our mission is to provide homeowners, architects, and designers with
            a diverse collection of high-quality house design blueprints that
            inspire creativity and innovation. With a focus on functionality,
            aesthetics, and sustainability, we strive to deliver designs that
            cater to every lifestyle and preference. Whether you're building
            your first home or reimagining your living space, DesignsRepo is
            here to guide you every step of the way. Together, let's create
            spaces that truly feel like home.
          </div>
        </div>
        {/* Contact */}
        <ContactCard/>
      </div>
    </div>
  );
};

export default HomePage;
