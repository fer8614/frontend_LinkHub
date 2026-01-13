import { BookmarkSquareIcon, UserIcon } from "@heroicons/react/20/solid";
import { ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { name: "Links", href: "/admin", icon: BookmarkSquareIcon },
  { name: "My Profile", href: "/admin/profile", icon: UserIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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
        <nav className="flex space-x-2" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.href}
              className={classNames(
                location.pathname === tab.href
                  ? "gradient-text border-b-2 border-gradient-to-r from-purple-500 to-pink-500"
                  : "nav-link",
                "group inline-flex items-center py-3 px-4 text-lg font-semibold transition-all duration-300",
              )}
            >
              <tab.icon
                className={classNames(
                  location.pathname === tab.href
                    ? "text-purple-400"
                    : "text-white/50 group-hover:text-white/70",
                  "-ml-0.5 mr-2 h-5 w-5 transition-colors",
                )}
                aria-hidden="true"
              />
              <span>{tab.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
