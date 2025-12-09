"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useUser } from "../context/UserContext";
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setAccountOpen(false);
  };

  return (
    <header className="w-full shadow-sm bg-header text-white">
      {/* Top Bar */}
      <div className="flex justify-end gap-4 text-sm p-2 pr-4">
        <span>help@wanderwiz.ca</span>
        <span>•</span>
        <span>+1 (444) 444-4444</span>
        <span>•</span>
        <span>444 4444 St SE, Calgary AB</span>
      </div>

      <div className="w-full h-px bg-white" />

      {/* Main Header */}
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt="Wander Wiz Logo"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <h1 className="text-xl font-semibold text-textheading">
            Wander Wiz
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 items-center text-base font-medium">
          <Link href="/">Home</Link>
          <Link href="/result">Result</Link>
          <Link href="/about">About</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
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
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white text-black border shadow-md rounded-lg p-3 min-w-40 text-sm text-center">
                    <Link
                      href="/profile"
                      className="block px-3 py-2 hover:bg-gray-100 rounded"
                      onClick={() => setAccountOpen(false)}
                    >
                      Profile
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

              {/* Welcome Text */}
              <div className="px-3 py-1 rounded-full bg-white/10 text-sm font-medium cursor-default">
                Welcome back,&nbsp;
                {profile?.fullName || authUser.email}
              </div>
            </>
          ) : (
            <Link href="/auth/signin" className="flex items-center gap-1">
              <User size={20} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
