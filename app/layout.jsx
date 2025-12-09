"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContext";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap children with UserProvider */}
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}