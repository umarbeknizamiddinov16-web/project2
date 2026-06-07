"use client";

export const dynamic = 'force-dynamic';
import "@/app/globals.css";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { isLoaded, user } = useUser();

  // Состояние загрузки сессии Clerk
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0F19] text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        <span className="ml-3 font-medium text-sm">Loading dashboard...</span>
      </div>
    );
  }

  // Если пользователь НЕ авторизован — показываем красивый экран блокировки
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0F19] text-center px-4">
        <div className="p-3 rounded-full bg-rose-500/10 text-rose-400 mb-4 text-xl">
          🔒
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-slate-400 text-sm max-w-sm mb-6">
          You need to be authenticated to view this dashboard. Please sign in to your account.
        </p>
        <a 
          href="/sign-in" 
          className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-lg shadow-indigo-600/20"
        >
          Go to Sign In
        </a>
      </div>
    );
  }

  // Если пользователь успешно вошел — рендерим изящный дашборд
  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-slate-100 font-sans antialiased">
      
      {/* Боковая панель (Sidebar) */}
      <aside className="w-64 bg-[#111827] border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
              S
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              SaaS Project
            </span>
          </div>
          
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-indigo-600/10 text-indigo-400 font-medium text-sm transition">
              📊 Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 font-medium text-sm transition">
              ⚙️ Settings
            </a>
          </nav>
        </div>

        {/* Кнопка выхода внизу сайдбара */}
        <SignOutButton>
          <button className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl transition border border-rose-500/20">
            🚪 Sign Out
          </button>
        </SignOutButton>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* Шапка дашборда */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Welcome back, {user?.firstName || 'User'}!
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Here is what's happening with your project today.
            </p>
          </div>
          
          {/* Профиль пользователя */}
          <div className="flex items-center gap-3 bg-[#111827] px-4 py-2 rounded-xl border border-slate-800">
            <img 
              src={user?.imageUrl} 
              alt="Profile" 
              className="h-8 w-8 rounded-full border border-indigo-500/30"
            />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-200">{user?.fullName}</p>
              <p className="text-[10px] text-slate-500 truncate max-w-[150px]">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        </header>

        {/* Сетка с карточками */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-xl transition hover:border-slate-700">
            <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Security</p>
            <h3 className="text-xl font-bold text-white mt-2">Session Secure</h3>
            <p className="text-sm text-slate-400 mt-1">Your connection via Clerk is active and encrypted.</p>
          </div>

          <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-xl transition hover:border-slate-700">
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Profile Status</p>
            <h3 className="text-xl font-bold text-white mt-2">Verified Account</h3>
            <p className="text-sm text-slate-400 mt-1">Email verification is successfully completed.</p>
          </div>

          <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-xl transition hover:border-slate-700">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Environment</p>
            <h3 className="text-xl font-bold text-white mt-2">Development Mode</h3>
            <p className="text-sm text-slate-400 mt-1">Using sandbox credentials for authentication testing.</p>
          </div>
        </section>

      </main>
    </div>
  );
}
