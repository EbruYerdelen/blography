"use client"

import Link from "next/link";
import { Globe } from "phosphor-react";

export default function LandingPage() {
  return (
    <div className="h-full">
      <div className="flex h-full justify-center items-center">
        <div className="w-[90%] h-[60%] bg-[rgba(209,209,209,0.51)] relative z-0">
          <div className="flex justify-evenly items-center p-4">
            <Globe size={30} color="#FFFFFF" />
            <h1 className="text-xl">Blography</h1>
            <Link href="/login">Login</Link>
          </div>
          <div>
            <h1> Explore your own landscape</h1>
            <button>Get Started</button>
          </div>
        </div>
      </div>


    </div>
  );
}
