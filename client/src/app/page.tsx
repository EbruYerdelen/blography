"use client";

import Link from "next/link";
import { Globe } from "phosphor-react";
import { motion, stagger, useInView } from "framer-motion";
import { useRef } from "react";
import { landingPageBlogGrid, landingPageBlogPosts } from "@/data/landing-data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Marquee } from "@/components/magicui/marquee";


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
      <div className="h-full bg-gradient-to-b from-[rgb(20,20,20)] to-black flex justify-center items-center">
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
                <Link href="/">Blography</Link>
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
              onClick={() => router.push("/login")}
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

      <motion.div className="p-10 pt-48 w-full flex flex-col justify-center items-center gap-y-1 !bg-black">
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
          className="text-3xl text-gray-400"
        >
          Write your journey, map your mind
        </motion.p>
      </motion.div>

      <section className=" mx-auto py-12 !bg-black ">
        <motion.h2
          variants={gridVariants}
          {...whileViewProps}
          custom={2}
          className="text-2xl text-center mb-8 text-gray-400"
        >
          No limits to your creativity
        </motion.h2>

        <div className="relative overflow-hidden">
          <Marquee pauseOnHover={true} className="py-4 [--duration:50s]">
            {landingPageBlogPosts.map((post) => (
              <div key={post.id} className="mx-2 w-[350px] flex-shrink-0">
                <article className="bg-[rgb(20,20,20)] rounded-md p-6 h-full flex flex-col hover:border-gray-600 transition-colors">
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
            ))}
          </Marquee>

          <div className="-right-1 z-40 absolute inset-y-0 bg-gradient-to-l from-[#070707] w-1/3 pointer-events-none"></div>
          <div className="-left-1 z-40 absolute inset-y-0 bg-gradient-to-r from-[#070707] w-1/3 pointer-events-none"></div>
        </div>
      </section>

      <div className="pt-52 !bg-gradient-to-b !from-black !to-[rgb(22,22,22)]  flex flex-col gap-y-10 items-center justify-center overflow-hidden">
        <motion.div
          variants={slideVariants}
          {...whileViewProps}
          className="pb-16 !bg-transparent"
        >
          <h1 className="text-8xl p-4">Start creating your own</h1>
        </motion.div>
        <div className="rotateImgEffectParent overflow-hidden relative">
          <Image
            src="/assets/images/blogHome.png"
            alt="blog-home"
            width={950}
            height={950}
            priority
            className=" rotateImgEffectReverse rounded-md"
          />
        </div>
      </div>

      <div className="container mx-auto p-4 pt-52">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {landingPageBlogGrid.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[rgb(18,18,18)] p-6 rounded-lg shadow-md"
              variants={gridVariants}
              {...whileViewProps}
              custom={index}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-white font-bold">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className=" pt-56 pb-56 flex flex-col justify-center items-center !bg-gradient-to-b !from-[rgb(22,22,22)]  !to-[rgb(97,97,102)]">
        <div className="flex flex-col gap-y-7 items-center justify-center">
          <h1 className="text-[rgba(65,65,66,0.61)] text-7xl text-shadow-hover p-4">
            Haven't Started Yet?
          </h1>
          <motion.button
            className=" flex items-center gap-1 px-6 py-3 bg-[rgb(86,86,88)] text-white rounded-lg shadow-md hover:bg-[rgb(73,73,75)] cursor-pointer"
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

      <div className="flex justify-center items-center w-full h-24 !bg-[rgb(97,97,102)]">
        <p className="text-gray-400 text-sm">
          © 2025 Blography. All rights reserved.
        </p>
      </div>
    </div>
  );
}




