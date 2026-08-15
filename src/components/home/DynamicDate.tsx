"use client";

import { useEffect, useState } from "react";

export function DynamicDate() {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    setFormattedDate(today.toLocaleDateString("en-IN", options));
  }, []);

  // Show placeholder during hydration to avoid SSG mismatch
  if (!formattedDate) {
    return <span>Loading date...</span>;
  }

  return <span>{formattedDate}</span>;
}