"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";


export default function SignUp() {
  const router = useRouter();
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    firebaseError
  ] = useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState("");

  const onSubmit = async () => {
    setError("");

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);

      if (res) {
        const user = res.user;

        // Save profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
          fullName,
          email,
          createdAt: new Date(),
          uid: user.uid,
        });

        // Send email verification
        await sendEmailVerification();

        // Navigate after successful signup
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };


  const isDisabled =
    !fullName || !email || !password || !confirmPassword || !agreeTerms;

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
              alt="Sign Up Visual"
              fill
              className="object-cover"
            />
          </div>

          {/* RIGHT FORM CONTENT */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-black text-center">
              Create Account
            </h2>

            {/* Error message */}
            {error && (
              <p className="text-red-600 text-center mb-4 font-medium">
                {error}
              </p>
            )}

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-black font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

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

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-black font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Terms Checkbox */}
            <div className="mb-6 flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="h-5 w-5"
              />
              <label className="text-black text-sm">
                I agree to the{" "}
                <Link href="/terms" className="underline text-blue-600">
                  Terms & Conditions
                </Link>
              </label>
            </div>

            {/* Button */}
            <button
              onClick={onSubmit}
              disabled={isDisabled}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              Create Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
