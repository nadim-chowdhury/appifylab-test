"use client";

import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const router = useRouter();
  const { login, isLoggingIn } = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Email and password are required.");
    }

    const result = await login({ email, password });

    if (result.success) {
      // Persist token manually if needed
      if (rememberMe) {
        localStorage.setItem("appData", JSON.stringify((result as any).data));
      } else {
        localStorage.setItem("appData", JSON.stringify((result as any).data));
      }

      router.push("/feed");
    } else {
      alert(result.error);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center relative overflow-hidden p-4">
      <div className="container mx-auto z-10">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-32 items-center">
          {/* Left Side - Illustration - Hidden on mobile and tablet */}
          <motion.div
            className="hidden lg:block col-span-2 p-8 xl:p-20"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/assets/images/login.png"
              alt="Login illustration"
              width={1600}
              height={900}
              className="w-full h-auto"
            />
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            className="w-full max-w-md mx-auto lg:mx-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-card rounded-2xl shadow-2xl p-6 sm:p-8 border border-border"
              variants={itemVariants}
            >
              {/* Logo */}
              <motion.div className="mb-6 sm:mb-8" variants={itemVariants}>
                <div className="flex items-center justify-center mb-6 sm:mb-8">
                  <Image
                    src="/assets/images/logo.svg"
                    alt="Logo"
                    width={160}
                    height={90}
                    className="w-32 sm:w-40 h-auto"
                  />
                </div>

                <p className="text-muted-foreground text-center text-sm mb-2">
                  Welcome back
                </p>
                <h1 className="text-2xl sm:text-3xl font-medium text-center text-foreground mb-6 sm:mb-8">
                  Login to your account
                </h1>
              </motion.div>

              {/* Google Login Button */}
              <motion.button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-background border border-border rounded px-4 sm:px-6 py-3 mb-6 sm:mb-8 hover:bg-accent transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="/assets/images/google.svg"
                  alt="Google"
                  width={24}
                  height={24}
                />
                <span className="text-foreground font-medium text-sm sm:text-base">
                  Or sign-in with google
                </span>
              </motion.button>

              {/* Divider */}
              <motion.div
                className="relative mb-6 sm:mb-8"
                variants={itemVariants}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">Or</span>
                </div>
              </motion.div>

              {/* Login Form */}
              <motion.div variants={itemVariants}>
                <motion.div className="mb-4" variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <motion.input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background border border-input rounded px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    placeholder="Enter your email"
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                <motion.div className="mb-4" variants={itemVariants}>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Password
                  </label>
                  <motion.input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-input rounded px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    placeholder="Enter your password"
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 sm:mb-8"
                  variants={itemVariants}
                >
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-2"
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
                    className="text-sm text-primary hover:underline text-left sm:text-right"
                  >
                    Forgot password?
                  </button>
                </motion.div>

                <motion.button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full bg-primary text-primary-foreground rounded px-6 py-2.5 sm:py-3 font-semibold hover:opacity-90 transition-opacity mb-6 sm:mb-8 flex items-center justify-center text-sm sm:text-base"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoggingIn ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Login now"
                  )}
                </motion.button>

                <motion.p
                  className="text-center text-sm text-muted-foreground"
                  variants={itemVariants}
                >
                  Don&apos;t have an account?{" "}
                  <Link href="/register">
                    <button
                      type="button"
                      className="text-primary hover:underline font-medium"
                    >
                      Create New Account
                    </button>
                  </Link>
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Shapes - Hidden on small screens */}
      <Image
        src="/assets/images/shape1.png"
        alt=""
        width={240}
        height={90}
        className="absolute top-0 left-0 hidden md:block"
      />
      <Image
        src="/assets/images/dark_shape1.svg"
        alt=""
        width={680}
        height={360}
        className="absolute -top-40 right-20 opacity-40 hidden lg:block"
      />
      <Image
        src="/assets/images/dark_shape2.svg"
        alt=""
        width={420}
        height={360}
        className="absolute bottom-2 right-80 hidden xl:block"
      />
    </div>
  );
}
