"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useUser } from "./context/UserContext";

export default function Home() {
  const { authUser, profile, loading } = useUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="bg-black min-h-screen text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Wander Wiz</h1>

      {authUser ? (
        <>
          <p className="mb-4">
            Welcome,{" "}
            <span className="font-semibold">
              {profile?.fullName || authUser.email}
            </span>
            !
          </p>

          {/* ✅ Sign Out */}
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </>
      ) : (
        <div className="flex gap-4">
          <Link href="/auth/signin" className="underline">
            Sign In
          </Link>

          <Link href="/auth/signup" className="underline">
            Create An Account
          </Link>
        </div>
      )}
    </div>
  );
}