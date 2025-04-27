"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/actions/login";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await loginUser(values);

      if (result.success) {
        toast.success(result.message);
        router.push("/dashboard");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Welcome back</h1>
        <p className="text-zinc-400">
          Enter your credentials to access your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    {...field}
                    className="bg-zinc-900 border-zinc-800 focus-visible:ring-zinc-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="text-zinc-400 hover:text-white text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="bg-zinc-900 border-zinc-800 focus-visible:ring-zinc-700"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="top-0 right-0 absolute px-3 py-2 h-full text-zinc-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-white hover:bg-zinc-200 w-full text-black"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>

      <p className="mt-6 text-zinc-500 text-sm text-center">
        {"Don't"} have an account?{" "}
        <Link href="/auth/register" className="text-white hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
}
