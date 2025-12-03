import { useState, useEffect } from "react";

export const useMounted = (): boolean => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid setState during render
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return mounted;
};
