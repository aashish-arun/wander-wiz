"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

export default function SignIn() {
  const router = useRouter();
  const [signInUserWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    if (!email || !password) return;
    const res = await signInUserWithEmailAndPassword(email, password);
    if (res) router.push("/");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#020914] p-4 text-white">
      <div className="w-full max-w-4xl bg-[#111827] rounded-3xl shadow-xl border border-white/10 overflow-hidden flex flex-col md:flex-row">

        {/* Image */}
        <div className="relative md:w-1/2 h-64 md:h-auto">
          <Image
            src="/images/auth.png"
            alt="WanderWiz Sign In"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
        </div>

        {/* Form */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Sign in to continue your journey
          </p>

          {error && (
            <p className="text-red-400 text-center mb-4 font-medium">
              {error.message.replace("Firebase:", "").trim()}
            </p>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[#020914] border border-white/10 focus:ring-2 focus:ring-[#0E74C5] outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#020914] border border-white/10 focus:ring-2 focus:ring-[#0E74C5] outline-none"
            />
          </div>

          <button
            onClick={onSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#0E74C5] hover:bg-[#FDB700] hover:text-black"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center mt-5 text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-[#FDB700] underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
