import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://counter.robloxwikihub.com/instagram-character-counter" },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
