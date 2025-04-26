"use client";

import type { ReactNode } from "react";
import { CuboidIcon as Cube } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathName = usePathname();
  return (
    <div className="flex bg-black min-h-screen">
      {/* Left side - testimonial */}
      <div className="hidden relative md:flex flex-col justify-between bg-zinc-900 p-10 md:w-1/2">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Cube className="w-6 h-6" />
            <span className="font-bold text-xl">Blography</span>
          </Link>
        </div>

        <div className="mb-10">
          <blockquote className="mb-4 font-medium text-2xl">
            {
              "This editor has saved me countless hours of work and helped me organize my thoughts faster than ever before."
            }
          </blockquote>
          <p className="text-zinc-400">Ebru Yerd</p>
        </div>
      </div>

      <div className="flex flex-col p-6 md:p-10 w-full md:w-1/2">
        <div className="flex justify-between items-center mb-10">
          <Link href="/" className="md:hidden flex items-center gap-2">
            <Cube className="w-6 h-6" />
            <span className="font-bold text-xl">Blography</span>
          </Link>
          <div className="ml-auto">
            {pathName.includes("/login") ? (
              <Link
                href="/register"
                className="text-zinc-400 hover:text-white text-sm"
              >
                Register
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-zinc-400 hover:text-white text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 justify-center mx-auto w-full max-w-md">
          {children}
        </div>

        <div className="mt-8 text-zinc-500 text-xs text-center">
          <p>
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="hover:text-zinc-300 underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="hover:text-zinc-300 underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
