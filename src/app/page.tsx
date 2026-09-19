import HomeClient from "@/components/HomeClient";

export const metadata = {
  alternates: { canonical: "https://counter.robloxwikihub.com" },
};

export default function HomePage() {
  return (
    <>
      <HomeClient />
      <div className="px-4 pb-8 text-center text-[11px] text-slate-500">
        Reviewed by Hlele · Content AI-assisted, human-reviewed · Data sources cited on page · Contact: lianlele168@gmail.com
      </div>
    </>
  );
}
