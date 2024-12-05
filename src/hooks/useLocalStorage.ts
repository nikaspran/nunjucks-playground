import { useEffect, useState } from "react";

export default function useLocalStorage<T extends string = string>(
  key: string,
  defaultValue: T
) {
  const [localState, setLocalState] = useState<T | null>(null);

  useEffect(() => {
    setLocalState((localStorage.getItem(key) as T) || defaultValue);
  }, [key, defaultValue]);

  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key === key && event.newValue) {
        setLocalState(event.newValue as T);
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [
    localState as T | null,
    (newValue: T) => {
      localStorage.setItem(key, newValue);
      setLocalState(newValue);
    },
  ] as const;
}
