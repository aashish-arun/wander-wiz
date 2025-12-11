"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full shadow-sm text-white" style={{ backgroundColor: "#020914" }}>
      <div className="w-full h-px" />

      {/* Main Header */}
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Wander Wiz Logo"
            width={80}
            height={80}
          />
          <h1 className="text-5xl font-semibold">
            WanderWiz
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <nav className="flex gap-6 items-center font-medium">
            <Link href="/">Home</Link>
            <Link href="/user/about">About</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
