import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F19]">
      {/* Оставляем чистый компонент, Next.js 16 теперь подхватит его через proxy.js */}
      <SignIn />
    </div>
  );
}
