import { useLocation } from "react-router-dom";
import AdminNavigation from "./nav/AdminNavigation";
import HomeNavigation from "./nav/HomeNavigation";
import Logo from "./Logo";

export default function Header() {
    const location = useLocation();
    return (
        <header className="glass-effect sticky top-0 z-50 py-4 border-b border-white/10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center md:justify-between px-4 md:px-0">
          <div className="w-full md:w-1/3">
            <Logo />
          </div>
          <nav className="md:w-1/3 md:flex md:justify-end mt-4 md:mt-0">
            {location.pathname === "/" ? <HomeNavigation /> : <AdminNavigation />}
          </nav>
        </div>
      </header>
    );
}