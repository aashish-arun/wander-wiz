"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useUser } from "../context/userContext";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const { authUser, profile, loading } = useUser();

  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setAccountOpen(false);
  };

  return (
    <header
      className="w-full shadow-sm text-white"
      style={{ backgroundColor: "#020914" }}
    >
      <div className="flex items-center justify-between p-4">

        {/* LEFT: Logo */}
        <div className="flex items-center gap-3 min-w-[260px]">
          <Image
            src="/images/logo.png"
            alt="Wander Wiz Logo"
            width={80}
            height={80}
          />
          <h1 className="text-5xl font-semibold">WanderWiz</h1>
        </div>

        {/* CENTER: Navigation (never moves) */}
        <nav className="hidden md:flex gap-6 items-center text-base font-medium">
          <Link href="/">Home</Link>
          <Link href="/user/about">About</Link>
        </nav>

        {/* RIGHT: Account area (fixed width) */}
        <div className="flex items-center justify-end gap-4 min-w-[320px]">
          {loading ? null : authUser ? (
            <>
              {/* My Account Dropdown */}
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-2 font-medium"
                >
                  <User size={20} />
                  <span>My Account</span>
                </button>

                {accountOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 
                                  bg-white text-black border shadow-md 
                                  rounded-lg p-3 min-w-40 text-sm 
                                  text-center">
                    
                    <Link
                      href="/user/history"
                      className="block px-3 py-2 hover:bg-gray-100 rounded w-full"
                      onClick={() => setAccountOpen(false)}
                    >
                      History
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Welcome */}
              <div className="px-3 py-1 rounded-full bg-white/10 text-sm font-medium cursor-default whitespace-nowrap">
                Welcome back,&nbsp;
                {profile?.fullName || authUser.email}
              </div>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="flex items-center gap-1 font-medium"
            >
              <User size={20} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
