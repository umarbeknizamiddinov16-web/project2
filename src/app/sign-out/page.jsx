"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    // Разлогиниваем пользователя и сразу перенаправляем на главную страницу
    signOut().then(() => {
      router.push("/");
    });
  }, [signOut, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg">Выходим из аккаунта, подождите...</p>
    </div>
  );
}
