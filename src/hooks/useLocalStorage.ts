import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, defaultValue: string) {
  const [localState, setLocalState] = useState(
    (typeof window !== "undefined" && localStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key === key && event.newValue) {
        setLocalState(event.newValue);
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [
    localState,
    (newValue: string) => {
      localStorage.setItem(key, newValue);
      setLocalState(newValue);
    },
  ] as const;
}
