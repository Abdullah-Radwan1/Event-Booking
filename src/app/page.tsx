import Image from "next/image";

import Banner from "@/components/banner";
import Events from "@/components/Events";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  p-4">
      {/* banner */}
      <Banner />
      <Events />
    </main>
  );
}
