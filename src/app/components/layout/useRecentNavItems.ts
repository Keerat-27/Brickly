import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "brickly-recent-nav";
const MAX_RECENT = 5;

export const useRecentNavItems = () => {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecent(JSON.parse(stored) as string[]);
      }
    } catch {
      setRecent([]);
    }
  }, []);

  const recordVisit = useCallback((path: string) => {
    if (path === "/") return;

    setRecent((prev) => {
      const next = [path, ...prev.filter((p) => p !== path)].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore quota errors
      }
      return next;
    });
  }, []);

  return { recent, recordVisit };
};
