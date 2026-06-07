import { auth } from "@clerk/nextjs/server";
import HeroContent from "@/components/HeroContent";

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <main className="min-h-screen bg-[#0B0F19]">
      <HeroContent userId={userId} />
    </main>
  );
}
