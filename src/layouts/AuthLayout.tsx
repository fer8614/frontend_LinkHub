import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Logo from "../components/Logo";

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-lg mx-auto pt-10 px-5 relative z-10">
          <Logo />

          <div className="py-10">
            <Outlet />
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  );
}
