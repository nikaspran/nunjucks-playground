import { ReactNode } from "react";

export default function ContentWrapper({ children }: { children: ReactNode }) {
  return <div className="max-w-6xl mx-auto px-4">{children}</div>;
}
