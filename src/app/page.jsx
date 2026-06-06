import { auth } from "@clerk/nextjs/server";
import HeroContent from "@/components/HeroContent";

export default async function HomePage() {
  // Серверная проверка авторизации Clerk работает идеально!
  const { userId } = await auth();

  // Передаем результат в клиентский компонент
  return <HeroContent userId={userId} />;
}
