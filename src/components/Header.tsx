import { useLocation } from "react-router-dom";
import AdminNavigation from "./nav/AdminNavigation";
import HomeNavigation from "./nav/HomeNavigation";
import Logo from "./Logo";

export default function Header() {
    const location = useLocation();
    return (
        <header className="glass-effect sticky top-0 z-50 py-3 border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4">
          <Logo />
          <nav>
            {location.pathname === "/" ? <HomeNavigation /> : <AdminNavigation />}
          </nav>
        </div>
      </header>
    );
}