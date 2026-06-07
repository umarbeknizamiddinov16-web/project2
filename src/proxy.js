import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Защищаем только дашборд
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

// Вместо export default middleware мы используем новый экспорт для Next.js 16
export default clerkMiddleware(async (auth, req) => {
  if (isDashboardRoute(req)) {
    await auth.protect(); // Закрываем дашборд от гостей
  }
});

export const config = {
  matcher: [
    // Официальный матчер, который проверяет все страницы авторизации и дашборд
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
