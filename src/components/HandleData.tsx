import { ChevronRight, LinkIcon } from "lucide-react";
import { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};

export default function HandleData({ data }: HandleDataProps) {

    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled);
  return (
    <div className="space-y-6 text-white max-w-md mx-auto">
      <div className="text-center space-y-5">
        {data.image && (
          <div className="flex justify-center">
            <img src={data.image} alt="Profile" className="w-28 h-28 rounded-2xl object-cover border border-white/10 shadow-lg shadow-purple-500/10" />
          </div>
        )}
        <div className="space-y-2">
          <p className="text-3xl font-extrabold gradient-text">{data.handle}</p>
          {data.description && (
            <p className="text-sm text-white/50 leading-relaxed max-w-sm mx-auto">{data.description}</p>
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-3 pt-2">
        {links.length ? 
            links.map((link) => (
                <a 
                    className="link-card group" 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer noopener"
                    key={link.name}
                >
                    <div className="social-link-icon group-hover:scale-105">
                      <img src={`/social/icon_${link.name}.svg`} alt={link.name} className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="capitalize text-white font-semibold text-sm">{link.name}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/25 group-hover:text-white/50 shrink-0" />
                </a>
            ))
            : (
              <div className="text-center py-16">
                <LinkIcon className="w-8 h-8 text-white/15 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No links yet</p>
              </div>
            )}
      </div>
    </div>
  );
}