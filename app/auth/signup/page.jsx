"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const router = useRouter();

  // Firebase authentication hooks
  const [createUserWithEmailAndPassword, user, loading, hookError] =
    useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  // Form input states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState(""); // User-friendly error message

  // Form submit handler
  const onSubmit = async () => {
    setError(""); // Reset previous errors

    // Frontend validations
    if (!fullName.trim()) return setError("Full name is required.");
    if (!email.trim()) return setError("Email is required.");
    if (!password) return setError("Password is required.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    if (!agreeTerms) return setError("You must agree to the Terms & Conditions.");

    try {
      // Create Firebase authentication account
      const res = await createUserWithEmailAndPassword(email, password);

      // If hook returned no result, show friendly message based on hookError
      if (!res) {
        if (hookError?.code) {
          switch (hookError.code) {
            case "auth/email-already-in-use":
              setError("Email is already registered.");
              break;
            case "auth/invalid-email":
              setError("Invalid email address.");
              break;
            case "auth/weak-password":
              setError("Password should be at least 6 characters.");
              break;
            default:
              setError("Failed to create account. Please try again.");
          }
        } else {
          setError("Failed to create account. Please try again.");
        }
        return;
      }

      // Save user data to Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        fullName,
        email,
        createdAt: new Date(),
      });

      // Send verification email
      await sendEmailVerification();

      // Redirect user after successful signup
      router.push("/");
    } catch {
      // Generic friendly message
      setError("Failed to create account. Please try again.");
    }
  };

  // Disable submit button if form is incomplete or loading
  const disabled =
    !fullName || !email || !password || !confirmPassword || !agreeTerms || loading;

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#020914] p-4 text-white">
      <div className="w-full max-w-4xl bg-[#111827] rounded-3xl shadow-xl border border-white/10 overflow-hidden flex flex-col md:flex-row">

        {/* Left Image Section */}
        <div className="relative md:w-1/2 h-64 md:h-auto">
          <Image
            src="/images/auth.png"
            alt="WanderWiz Sign Up"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Start exploring smarter with WanderWiz
          </p>

          {/* Display friendly error message */}
          {error && (
            <div className="bg-red-700/80 text-center py-2 rounded mb-4 font-medium">
              {error}
            </div>
          )}

          {/* Input fields */}
          {[
            ["Full Name", fullName, setFullName, "text"],
            ["Email", email, setEmail, "email"],
            ["Password", password, setPassword, "password"],
            ["Confirm Password", confirmPassword, setConfirmPassword, "password"],
          ].map(([label, value, setter, type], i) => (
            <div className="mb-4" key={i}>
              <label className="block mb-1 text-sm font-medium">{label}</label>
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#020914] border border-white/10 focus:ring-2 focus:ring-[#0E74C5] outline-none"
              />
            </div>
          ))}

          {/* Terms & Conditions */}
          <div className="flex items-center gap-2 mb-6 justify-center">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              className="h-5 w-5"
            />
            <span className="text-sm">
              I agree to the{" "}
              <Link href="/terms" className="text-[#FDB700] underline">
                Terms & Conditions
              </Link>
            </span>
          </div>

          {/* Submit Button */}
          <button
            onClick={onSubmit}
            disabled={disabled}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              disabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#0E74C5] hover:bg-[#FDB700] hover:text-black"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Sign In Link */}
          <p className="text-center mt-5 text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-[#FDB700] underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
