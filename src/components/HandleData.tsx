import { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};

export default function HandleData({ data }: HandleDataProps) {

    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled);
  return (
    <div className="space-y-8 text-white">
      <div className="text-center space-y-4">
        <p className="text-6xl font-black gradient-text">{data.handle}</p>
        {data.image && (
          <div className="flex justify-center">
            <img src={data.image} alt="Profile" className="w-48 h-48 rounded-2xl object-cover border-2 border-white/20" />
          </div>
        )}
        <p className="text-lg font-semibold text-white/90 max-w-md mx-auto leading-relaxed">{data.description}</p>
      </div>
      
      <div className="mt-12 flex flex-col gap-4">
        {links.length ? 
            links.map((link) => (
                <a 
                    className="link-card group" 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer noopener"
                    key={link.name}
                >
                    <div className="social-link-icon group-hover:scale-110">
                      <img src={`/social/icon_${link.name}.svg`} alt={link.name} className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-sm uppercase tracking-wider">Visit My</p>
                      <p className="capitalize text-white font-bold text-lg">{link.name}</p>
                    </div>
                    <div className="text-white/40 group-hover:text-white/60 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                </a>
            ))
            : (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg">There are no links in this profile</p>
              </div>
            )}
      </div>
    </div>
  );
}