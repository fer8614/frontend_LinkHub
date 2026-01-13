import { Switch } from "@headlessui/react";
import { ChangeEvent } from "react";
import { LinkHubLink } from "../types";
import { classNames } from "../utils";

type LinkHubInputProps = {
  item: LinkHubLink;
  handleUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEnableLink: (socialNetwork: string) => void;
};

export default function LinkHubInput({
  item,
  handleUrlChange,
  handleEnableLink,
}: LinkHubInputProps) {
  return (
    <div className="card-modern-dark p-5 flex items-center gap-4 group hover:border-white/30">
      <div
        className="social-link-icon flex-shrink-0"
        style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
      ></div>
      <input
        type="text"
        className="input-modern flex-1"
        placeholder={`Enter your ${item.name} URL`}
        value={item.url}
        onChange={handleUrlChange}
        name={item.name}
      />

      <Switch
        checked={item.enabled}
        onChange={() => handleEnableLink(item.name)}
        className={classNames(
          item.enabled ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white/10",
          "relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border border-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900",
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            item.enabled ? "translate-x-7" : "translate-x-1",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out",
          )}
        />
      </Switch>
    </div>
  );
}
