"use client";

import ImageSlider from "@/components/ui/image-slider";
import { RxArrowRight, RxComponent2, RxStar, RxHeart } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import ContactCard from "@/components/contact-card";
import { useRouter } from "next/navigation";
import DesignCard from "@/components/ui/design-card";
import { IProduct } from "@/types/type";
import {
  normalizeOneProduct,
  normalizeProducts,
} from "@/services/product.service";
import axios from "axios";

const images = [
  "https://i.pinimg.com/736x/0f/f0/ac/0ff0ac7f874321bcfda7fa4a10368ed5.jpg",
  "https://i.pinimg.com/736x/b5/a0/b8/b5a0b8ec56aed5829fe9b99f7a7d6d0b.jpg",
  "https://i.pinimg.com/736x/90/e0/f6/90e0f69adb184557815264ba560dcb17.jpg",
];

const HomePage = () => {
  const router = useRouter();
  const [recommendedDesigns, setRecommendedDesigns] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedDesigns = async () => {
      try {
        setIsLoading(true);
        const productTypeIds = [1, 2, 3];
        const designs: IProduct[] = [];

        // Fetch first product from each product type
        for (const id of productTypeIds) {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/product/popular/{productTypeId}?productTypeId=${id}`
            );

            if (response.data) {
              const normalizedProduct = normalizeOneProduct(response.data);
              designs.push(normalizedProduct);
            }
          } catch (error) {
            console.error(`Error fetching products for type ${id}:`, error);
          }
        }

        setRecommendedDesigns(designs);
      } catch (error) {
        console.error("Error fetching recommended designs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedDesigns();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-4 py-8 md:py-16">
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
              <a href="#recommend">
                <button className="btn btn-primary flex items-center gap-2 px-8 py-3">
                  <span>Get started</span>
                  <RxArrowRight size={20} />
                </button>
              </a>

              <a href="#contact">
                <button className="btn btn-outline flex items-center gap-2 px-8 py-3">
                  <RxComponent2 size={20} />
                  <span>Contact us</span>
                </button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ImageSlider images={images} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="bg-primary-content text-neutral rounded-2xl py-16"
      >
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
      <section id="recommend" className="py-16">
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

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-8">
              {recommendedDesigns.map((design) => (
                <DesignCard key={design.id} design={design} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button
              className="btn btn-outline btn-lg"
              onClick={() => {
                router.push("/customer/product");
              }}
            >
              View All Designs
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-neutral py-16">
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
