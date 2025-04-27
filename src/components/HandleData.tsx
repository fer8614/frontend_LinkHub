import { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};

export default function HandleData({ data }: HandleDataProps) {

    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled);
  return (
    <div className="space-y-6 text-white">
      <p className="text-5xl text-center font-black">{data.handle}</p>
      {data.image && <img src={data.image} alt="image" className="mx-auto max-w-[250px]" />}
      <p className="text-lg text-center font-bold">{data.description}</p>
      <div className="mt-20 flex flex-col gap-6">
        {links.length ? 
            links.map((link) => (
                <a 
                    className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg hover:bg-gray-200" 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer noopener"
                    key={link.name}
                >
                    <img src={`/social/icon_${link.name}.svg`} alt="image Social Network" className="w-12" />
                    <p className="text-black capitalize font-bold text-lg">Visit my: {link.name}</p>
                </a>
            ))
            : <p className="text-center">There are no links in this profile</p>}
      </div>
      
    </div>
  );
}