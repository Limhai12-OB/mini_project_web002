"use client";

import { Button } from "@heroui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginFormComponent() {
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setSubmitError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (!result) {
        setSubmitError("No response from server");
      } else if (result.error) {
        setSubmitError(
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : "Login failed. Please try again.",
        );
      } else {
        router.replace(result.url || "/");
        router.refresh();
      }
    } catch (error) {
      setSubmitError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-gray-200/60 sm:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        {submitError && <p className="text-red-500">{submitError}</p>}
        <div>
          <label
            htmlFor="login-email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
            placeholder="you@example.com"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <div>
          <label
            htmlFor="login-password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
            className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
            placeholder="••••••••"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <Button className="" type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
