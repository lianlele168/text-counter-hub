import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://counter.robloxwikihub.com/amazon-listing-character-counter" },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
