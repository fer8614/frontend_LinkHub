import { useState, ChangeEvent, useEffect } from "react";
import { social } from "../data/social";
import LinkHubInput from "../components/LinkHubInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/LinkHubApi";
import { User } from "../types";

export default function LinkHubView() {
  const [linkHubLinks, setLinkHubLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const updatedData = linkHubLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link) => link.name === item.name,
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });

    setLinkHubLinks(updatedData);
  }, []);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = linkHubLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link,
    );
    setLinkHubLinks(updatedLinks);

    queryClient.setQueryData(["user"], (prevData: User) => ({
      ...prevData,
      links: JSON.stringify(updatedLinks),
    }));
  };

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = linkHubLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("Invalid URL");
        }
      }
      return link;
    });
    setLinkHubLinks(updatedLinks);

    queryClient.setQueryData(["user"], (prevData: User) => ({
      ...prevData,
      links: JSON.stringify(updatedLinks),
    }));
  };
  return (
    <>
      <div className="space-y-5">
        {linkHubLinks.map((item) => (
          <LinkHubInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <button
          className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
          onClick={() => mutate(user)}
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
