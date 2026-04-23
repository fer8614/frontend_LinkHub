import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Logo from "../components/Logo";

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] animate-blob" />
          <div className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] bg-pink-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-5%] left-[40%] w-[350px] h-[350px] bg-cyan-600/8 rounded-full blur-[120px] animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-lg mx-auto pt-10 px-5 relative z-10">
          <Logo />

          <div className="py-10">
            <Outlet />
          </div>
        </div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(15, 15, 35, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "white",
            backdropFilter: "blur(12px)",
          },
        }}
      />
    </>
  );
}
