"use client";

import { Marquee } from "@/components/magicui/marquee";
import { landingPageBlogGrid, landingPageBlogPosts } from "@/data/landing-data";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { CuboidIcon as Cube } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe } from "phosphor-react";
import { useRef } from "react";


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
  hidden: {x: -80, backgroundColor: "black" },
  visible: {
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
};

const gridVariants = {
  hidden: {
    opacity: 0,
  },
  visible: (custom:number) => ({
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
      delay: custom * 0.1, 
    },
  }),
};

export default function LandingPage() {
  const router = useRouter();
  const mainRef = useRef(null);
  const isInView = useInView(mainRef, {
    margin: "0px 0px -50px 0px",
    once: true,
  });

    const animationProps = {
      animate: isInView ? "visible": "hidden",
      initial: "hidden",
    };
      const whileViewProps = {
        whileInView: isInView ? "visible" : "hidden",
        initial: "hidden",
      };
  
  
  
  return (
    <div ref={mainRef} className="h-screen">
      <div className="flex justify-center items-center bg-gradient-to-b from-[rgb(20,20,20)] to-black h-full">
        <motion.div
          className="z-0 relative flex flex-col space-y-20 bg-gradient-to-br from-[rgba(209,209,209,0.03)] to-[rgba(245,245,245,0.14)] shadow-lg rounded-sm w-[90%] h-[75%] overflow-hidden"
          variants={containerVariants}
          {...animationProps}
        >
          <motion.div
            className="z-10 relative flex justify-between items-center p-4 border-[rgb(10,10,10)] border-b"
            variants={itemVariants}
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 pl-8 cursor-pointer"
            >
              <Cube size={32} color="#FFFFFF" />
              <motion.h1 className="text-white text-xl" variants={itemVariants}>
                <Link href="/">Blography</Link>
              </motion.h1>
            </motion.div>
            <Link
              href="/login"
              className="bg-white mr-8 px-4 py-1 rounded-md font-medium text-black hover:underline"
            >
              Login
            </Link>
          </motion.div>

          <div className="z-10 relative space-y-2 pl-12">
            <motion.h1 className="text-white text-5xl" variants={itemVariants}>
              Explore your own landscape
            </motion.h1>
            <motion.p
              className="max-w-xl text-gray-400"
              variants={itemVariants}
            >
              Discover a world of creativity and expression. Join us to share
              your thoughts, ideas, and stories with the world.
            </motion.p>
            <motion.button
              className="bg-white hover:bg-[rgb(102,102,102)] shadow-md px-6 py-3 rounded-lg text-black cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/login")}
            >
              Get Started
            </motion.button>
          </div>

          <div className="right-[-100px] bottom-[-150px] z-0 absolute w-3xl h-[70%] rotateImgEffectParent">
            <img
              className="rounded-md w-full h-full object-cover rotateImgEffect"
              src="/assets/images/heroBg.png"
              alt="Hero Background"
            />
          </div>
        </motion.div>
      </div>

      <motion.div className="flex flex-col justify-center items-center gap-y-1 !bg-black p-10 pt-48 w-full">
        <motion.h1
          variants={gridVariants}
          {...whileViewProps}
          custom={0}
          className="text-6xl"
        >
          Where words meet the world
        </motion.h1>
        <motion.p
          variants={gridVariants}
          {...whileViewProps}
          custom={1}
          className="text-gray-400 text-3xl"
        >
          Write your journey, map your mind
        </motion.p>
      </motion.div>

      <section className="!bg-black mx-auto py-12">
        <motion.h2
          variants={gridVariants}
          {...whileViewProps}
          custom={2}
          className="mb-8 text-gray-400 text-2xl text-center"
        >
          No limits to your creativity
        </motion.h2>

        <div className="relative overflow-hidden">
          <Marquee pauseOnHover={true} className="py-4 [--duration:50s]">
            {landingPageBlogPosts.map((post) => (
              <div key={post.id} className="flex-shrink-0 mx-2 w-[350px]">
                <article className="flex flex-col bg-[rgb(20,20,20)] p-6 hover:border-gray-600 rounded-md h-full transition-colors">
                  <div className="flex items-center mb-3">
                    <span className="relative flex mr-2 w-3 h-3">
                      <span className="inline-flex absolute bg-gray-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
                      <span className="inline-flex relative bg-gray-500 rounded-full w-3 h-3"></span>
                    </span>
                    <time className="text-gray-400 text-sm">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <h3 className="mb-3 font-semibold text-gray-100 text-xl line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="flex-grow mb-4 text-gray-300 line-clamp-3">
                    {post.description}
                  </p>
                </article>
              </div>
            ))}
          </Marquee>

          <div className="-right-1 z-40 absolute inset-y-0 bg-gradient-to-l from-[#070707] w-1/3 pointer-events-none"></div>
          <div className="-left-1 z-40 absolute inset-y-0 bg-gradient-to-r from-[#070707] w-1/3 pointer-events-none"></div>
        </div>
      </section>

      <div className="flex flex-col justify-center items-center gap-y-10 !bg-gradient-to-b !from-black !to-[rgb(22,22,22)] pt-52 overflow-hidden">
        <motion.div
          variants={slideVariants}
          {...whileViewProps}
          className="!bg-transparent pb-16"
        >
          <h1 className="p-4 text-8xl">Start creating your own</h1>
        </motion.div>
        <div className="relative overflow-hidden rotateImgEffectParent">
          <Image
            src="/assets/images/blogHome.png"
            alt="blog-home"
            width={950}
            height={950}
            priority
            className="rounded-md rotateImgEffectReverse"
          />
        </div>
      </div>

      <div className="mx-auto p-4 pt-52 container">
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {landingPageBlogGrid.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[rgb(18,18,18)] shadow-md p-6 rounded-lg"
              variants={gridVariants}
              {...whileViewProps}
              custom={index}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="font-bold text-white">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center !bg-gradient-to-b !from-[rgb(22,22,22)] !to-[rgb(97,97,102)] pt-56 pb-56">
        <div className="flex flex-col justify-center items-center gap-y-7">
          <h1 className="text-shadow-hover p-4 text-[rgba(65,65,66,0.61)] text-7xl">
            {"Haven't"} Started Yet?
          </h1>
          <motion.button
            className="flex items-center gap-1 bg-[rgb(86,86,88)] hover:bg-[rgb(73,73,75)] shadow-md px-6 py-3 rounded-lg text-white cursor-pointer"
            variants={itemVariants}
            {...animationProps}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/login")}
          >
            <Globe size={30} color="#FFFFFF" />
            Start your journey
          </motion.button>
        </div>
      </div>

      <div className="flex justify-center items-center !bg-[rgb(97,97,102)] w-full h-24">
        <p className="text-gray-400 text-sm">
          © 2025 Blography. All rights reserved.
        </p>
      </div>
    </div>
  );
}




