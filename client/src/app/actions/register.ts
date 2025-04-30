"use server";

export async function registerUser(formData: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_ULR}/auth/register`, {
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
        message: data.message || "Registration failed",
      };
    }

    return {
      success: true,
      message: "Registration successful!",
      user: data.user,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "An error occurred during registration",
    };
  }
}
