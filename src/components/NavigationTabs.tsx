import { Link2, UserCircle } from "lucide-react";
import { ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { classNames } from "../utils";

const tabs = [
  { name: "Links", href: "/admin", icon: Link2 },
  { name: "My Profile", href: "/admin/profile", icon: UserCircle },
];

export default function NavigationTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    navigate(e.target.value);
  };

  return (
    <div className="mb-8">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="input-modern w-full"
          onChange={handleChange}
        >
          {tabs.map((tab) => (
            <option value={tab.href} key={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <nav className="flex gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl w-fit" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.href;
            return (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  isActive
                    ? "bg-white/[0.08] text-white border-white/[0.1]"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.04] border-transparent",
                  "inline-flex items-center gap-2 py-2.5 px-5 text-sm font-medium rounded-lg border",
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
