"use client";

import ImageSlider from "@/components/ui/image-slider";
import { RxArrowRight, RxComponent2, RxStar, RxHeart } from "react-icons/rx";
import React from "react";
import ContactCard from "@/components/contact-card";
import { useRouter } from "next/navigation";

const images = [
  "https://i.pinimg.com/736x/0f/f0/ac/0ff0ac7f874321bcfda7fa4a10368ed5.jpg",
  "https://i.pinimg.com/736x/b5/a0/b8/b5a0b8ec56aed5829fe9b99f7a7d6d0b.jpg",
  "https://i.pinimg.com/736x/90/e0/f6/90e0f69adb184557815264ba560dcb17.jpg",
];

const recommendedDesigns = [
  {
    id: 1,
    title: "Modern Villa Design",
    image:
      "https://i.pinimg.com/736x/0f/f0/ac/0ff0ac7f874321bcfda7fa4a10368ed5.jpg",
    price: "2,500,000 VNĐ",
    rating: 4.8,
    likes: 156,
  },
  {
    id: 2,
    title: "Contemporary House",
    image:
      "https://i.pinimg.com/736x/b5/a0/b8/b5a0b8ec56aed5829fe9b99f7a7d6d0b.jpg",
    price: "1,800,000 VNĐ",
    rating: 4.6,
    likes: 98,
  },
  {
    id: 3,
    title: "Luxury Mansion",
    image:
      "https://i.pinimg.com/736x/90/e0/f6/90e0f69adb184557815264ba560dcb17.jpg",
    price: "5,200,000 VNĐ",
    rating: 4.9,
    likes: 234,
  },
];

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Get your perfect design for your
              <span className="text-blue-600"> dreaming house</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to DesignsRepo, your ultimate destination for inspiring
              and innovative house design blueprints. Explore, customize, and
              create the perfect foundation for your dream home with us!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary flex items-center gap-2 px-8 py-3">
                <span>Get started</span>
                <RxArrowRight size={20} />
              </button>
              <button className="btn btn-outline flex items-center gap-2 px-8 py-3">
                <RxComponent2 size={20} />
                <span>Contact us</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ImageSlider images={images} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-primary-content text-neutral rounded-2xl py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
            <p className="text-lg leading-relaxed mb-8">
              At DesignsRepo, we are passionate about turning dreams into
              reality. Our mission is to provide homeowners, architects, and
              designers with a diverse collection of high-quality house design
              blueprints that inspire creativity and innovation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RxComponent2 className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Designs</h3>
                <p className="text-gray-600">
                  High-quality blueprints crafted by professional architects
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RxStar className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                <p className="text-gray-600">
                  Dedicated team to guide you through your design journey
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RxHeart className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                <p className="text-gray-600">
                  Your satisfaction and dream home are our top priorities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recommended Designs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and highly-rated house designs,
              carefully curated to inspire your next project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedDesigns.map((design) => (
              <div
                key={design.id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <figure className="h-48 overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg">{design.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <RxStar className="text-yellow-500" />
                      <span>{design.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <RxHeart className="text-red-500" />
                      <span>{design.likes}</span>
                    </div>
                  </div>
                  <div className="card-actions justify-between items-center mt-4">
                    <span className="text-xl font-bold text-blue-600">
                      {design.price}
                    </span>
                    <button className="btn btn-primary btn-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn btn-outline btn-lg" onClick={()=>{router.push('/customer/product')}}>View All Designs</button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to start your dream home project? Contact us today and let's
              bring your vision to life
            </p>
          </div>
          <ContactCard />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
