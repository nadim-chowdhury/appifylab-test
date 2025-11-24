"use client";

import { useAuth } from "@/hooks/use-auth";
import { useLoginMutation } from "@/store/services/authService";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const router = useRouter();
  const { login, isLoggingIn } = useAuth();
  const [loginUser, { isLoading }] = useLoginMutation();

  // const handleLogin = async (e: any) => {
  //   e.preventDefault();

  //   if (!email || !password) {
  //     return alert("Please enter both email and password");
  //   }

  //   try {
  //     const result = await loginUser({
  //       email,
  //       password,
  //     }).unwrap();

  //     console.log("Login success:", result);

  //     // Save token (optional)
  //     if (rememberMe) {
  //       localStorage.setItem("appData", (result as any).data);
  //     } else {
  //       localStorage.setItem("appData", (result as any).data);
  //     }

  //     // Redirect
  //     window.location.href = "/feed";
  //   } catch (err: any) {
  //     console.error("Login failed:", err);
  //     alert(err?.data?.message || "Invalid email or password");
  //   }
  // };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Email and password are required.");
    }

    const result = await login({ email, password });

    if (result.success) {
      // Persist token manually if needed
      if (rememberMe) {
        localStorage.setItem("appData", (result as any).data);
      } else {
        localStorage.setItem("appData", (result as any).data);
      }

      router.push("/feed");
    } else {
      alert(result.error);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center relative overflow-hidden p-4">
      <div className="container mx-auto z-10">
        <div className="grid lg:grid-cols-3 gap-32 items-center">
          {/* Left Side - Illustration */}
          <div className="col-span-2 p-20">
            <Image
              src="/assets/images/login.png"
              alt=""
              width={1600}
              height={900}
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border">
              {/* Logo */}
              <div className="mb-8">
                <div className="flex items-center justify-center mb-8">
                  <Image
                    src="/assets/images/logo.svg"
                    alt=""
                    width={160}
                    height={90}
                  />
                </div>

                <p className="text-muted-foreground text-center text-sm mb-2">
                  Welcome back
                </p>
                <h1 className="text-3xl font-medium text-center text-foreground mb-8">
                  Login to your account
                </h1>
              </div>

              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-background border border-border rounded px-6 py-3 mb-8 hover:bg-accent transition-colors"
              >
                <Image
                  src="/assets/images/google.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="text-foreground font-medium">
                  Or sign-in with google
                </span>
              </button>

              {/* Divider */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Login Form */}
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background border border-input rounded px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-input rounded px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded-full border-border text-primary focus:ring-primary focus:ring-2"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm text-foreground"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full bg-primary text-primary-foreground rounded px-6 py-3 font-semibold hover:opacity-90 transition-opacity mb-8"
                >
                  Login now
                </button>

                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/register">
                    <button
                      type="button"
                      className="text-primary hover:underline font-medium"
                    >
                      Create New Account
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/assets/images/shape1.png"
        alt=""
        width={240}
        height={90}
        className="absolute top-0 left-0"
      />
      <Image
        src="/assets/images/dark_shape1.svg"
        alt=""
        width={680}
        height={360}
        className="absolute -top-40 right-20 opacity-40"
      />
      <Image
        src="/assets/images/dark_shape2.svg"
        alt=""
        width={420}
        height={360}
        className="absolute bottom-2 right-80"
      />
    </div>
  );
}
