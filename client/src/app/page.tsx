"use client";

import Link from "next/link";
import { Globe } from "phosphor-react";
import { motion, stagger, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import { landingPageBlogPosts } from "@/data/landing-data";


const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const slideVariants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
};

export default function LandingPage() {
  const mainRef = useRef(null);
  const isInView = useInView(mainRef, {
    margin: "0px 0px -5% 0px",
    once: true,
  });

    const animationProps = {
      animate: isInView ? "visible": "hidden",
      initial: "hidden",
    };
  
  
  
  return (
    <div className="h-screen">
      <div
        ref={mainRef}
        className="h-full bg-gradient-to-b from-[rgb(20,20,20)] to-black flex justify-center items-center"
      >
        <motion.div
          className="flex flex-col space-y-20 w-[90%] h-[75%] bg-gradient-to-br from-[rgba(209,209,209,0.03)] to-[rgba(245,245,245,0.14)]  rounded-sm shadow-lg relative z-0 overflow-hidden"
          variants={containerVariants}
          {...animationProps}
        >
          <motion.div
            className="flex justify-between items-center p-4 border-b border-[rgb(10,10,10)] relative z-10"
            variants={itemVariants}
          >
            <motion.div
              variants={itemVariants}
              className="flex pl-8 gap-2 items-center cursor-pointer"
            >
              <Globe size={32} color="#FFFFFF" />
              <motion.h1 className="text-xl text-white" variants={itemVariants}>
                Blography
              </motion.h1>
            </motion.div>
            <Link
              href="/login"
              className="text-black mr-8 bg-white px-4 py-1 rounded-md font-medium hover:underline"
            >
              Login
            </Link>
          </motion.div>

          <div className="pl-12 space-y-2 relative z-10">
            <motion.h1 className="text-5xl text-white" variants={itemVariants}>
              Explore your own landscape
            </motion.h1>
            <motion.p
              className="text-gray-400 max-w-xl"
              variants={itemVariants}
            >
              Discover a world of creativity and expression. Join us to share
              your thoughts, ideas, and stories with the world.
            </motion.p>
            <motion.button
              className="px-6 py-3 bg-white text-black rounded-lg shadow-md hover:bg-[rgb(102,102,102)] cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          <div className="absolute bottom-[-150px] right-[-100px] w-3xl h-[70%] z-0 rotateImgEffectParent">
            <img
              className="w-full h-full object-cover rotateImgEffect rounded-md "
              src="/assets/images/heroBg.png"
              alt="Hero Background"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate="visible"
        className="p-10 pt-48 w-full flex flex-col justify-center items-center gap-y-1"
      >
        <motion.h1 className="text-6xl">Where words meet the world</motion.h1>
        <motion.p className="text-3xl text-gray-400">
          {" "}
          Write your journey, map your mind
        </motion.p>
      </motion.div>



      <section className="max-w-4xl mx-auto py-12 px-4">
        <motion.h2
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl text-center mb-8 text-gray-400"
        >
          No limits to your creativity
        </motion.h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {landingPageBlogPosts.map((post) => (
              <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2 h-full">
                  <article className="bg-[rgb(20,20,20)] border border-white rounded-xl p-6 h-full flex flex-col hover:border-gray-600 transition-colors">
                    <div className="flex items-center mb-3">
                      <span className="flex h-3 w-3 relative mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span>
                      </span>
                      <time className="text-sm text-gray-400">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-100 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-300 mb-4 line-clamp-3 flex-grow">
                      {post.description}
                    </p>
                  </article>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 bg-[rgb(20,20,20)] hover:bg-[rgb(36,36,36)] border-gray-700" />
          <CarouselNext className="right-1 bg-[rgb(20,20,20)] hover:bg-[rgb(36,36,36)] border-gray-700" />
        </Carousel>
      </section>
    </div>
  );
}




