"use client";

import { UserProvider } from "./context/userContext";

export default function Providers({ children }) {
  return <UserProvider>{children}</UserProvider>;
}