"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [auth, setAuth] = useState(true);

  useEffect(() => { 
    if (auth && (pathname === "/login" || pathname === "/register")) {
      router.push("/home"); 
    }
  }, [auth, pathname, router]);

  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
      </div>
    </nav>
  );
};
