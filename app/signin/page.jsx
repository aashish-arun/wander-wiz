"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function SignIn() {
  const router = useRouter();

  const [
    signInUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    if (!email || !password) return;

    const res = await signInUserWithEmailAndPassword(email, password);

    if (res) {
      router.push("/");
    }
  };

  return (
    <div>
      <section className="relative w-full min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <Image
          src="/images/bg-coffee.gif"
          alt="Background"
          fill
          className="object-cover absolute inset-0 -z-10"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 -z-10" />

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row w-[90%] max-w-5xl">
          
          {/* LEFT IMAGE */}
          <div className="relative w-full md:w-1/2 h-60 md:h-auto">
            <Image
              src="/images/about-s6-1.jpeg"
              alt="Sign In Visual"
              fill
              className="object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-black text-center">
              Sign In
            </h2>

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-center mt-2 mb-4 font-medium">
                {error.message.replace("Firebase:", "").trim()}
              </p>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-black font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-black font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              onClick={onSubmit}
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Link to Sign Up */}
            <p className="text-center mt-4 text-sm">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-blue-600 underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
