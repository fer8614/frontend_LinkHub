import { useState, ChangeEvent } from "react";
import { social } from "../data/social";
import LinkHubInput from "../components/LinkHubInput";

export default function LinkHubView() {
  const [linkHubLinks, setLinkHubLinks] = useState(social);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = linkHubLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link,
    );
    console.log(updatedLinks);
    setLinkHubLinks(updatedLinks);
  };
  return (
    <>
      <div className="space-y-5">
        {linkHubLinks.map((item) => (
          <LinkHubInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
          />
        ))}
      </div>
    </>
  );
}
