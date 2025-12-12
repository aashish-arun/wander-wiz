"use client";

import { Suspense } from "react";
import Content from "../../components/content";

export default function Result() {
  return (
    <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
      <Content />
    </Suspense>
  );
}