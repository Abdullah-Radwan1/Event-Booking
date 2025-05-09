import Banner from "@/components/banner";
import Events from "@/components/Events";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between  p-6">
      {/* banner */}
      <Banner lang={lang} />
      <Events lang={lang} />
    </main>
  );
}
