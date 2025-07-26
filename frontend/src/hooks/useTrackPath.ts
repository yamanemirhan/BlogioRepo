"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useTrackPath() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      document.cookie = `previousPath=${pathname}; path=/`;
    }
  }, [pathname]);
}
