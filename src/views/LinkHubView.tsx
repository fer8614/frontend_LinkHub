import { useState } from "react";
import { social } from "../data/social";
import LinkHubInput from "../components/LinkHubInput";

export default function LinkHubView() {
  const [linkHubLinks, setLinkHubLinks] = useState(social);

  return (
    <>
      <div className="space-y-5">
        {linkHubLinks.map((item) => (
          <LinkHubInput key={item.name} item={item} />
        ))}
      </div>
    </>
  );
}
