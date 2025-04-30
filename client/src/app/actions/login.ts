"use server";

import { cookies } from "next/headers";

export async function loginUser(formData: { email: string; password: string }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ULR}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Login failed",
      };
    }

    // Store the token in cookies
    (
      await // Store the token in cookies
      cookies()
    ).set({
      name: "token",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      // Set expiry based on token expiry if available
      maxAge: 3600, // 1 hour (adjust as needed)
    });

    return {
      success: true,
      message: "Login successful!",
      token: data.token,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An error occurred during login",
    };
  }
}
