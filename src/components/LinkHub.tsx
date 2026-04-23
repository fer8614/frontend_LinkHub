import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { ExternalLink } from "lucide-react";
import NavigationTabs from "../components/NavigationTabs";
import { SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import LinkHubLink from "./LinkHubLink";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

type LinkHubProps = {
  data: User;
};

export default function LinkHub({ data }: LinkHubProps) {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled),
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled),
    );
  }, [data]);

  const queryClient = useQueryClient();
  
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && over.id) {
      const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
      const nextIndex = enabledLinks.findIndex((link) => link.id === over?.id);
      const updatedLinks = arrayMove(enabledLinks, prevIndex, nextIndex);
      setEnabledLinks(updatedLinks);

      const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled);
      const links = updatedLinks.concat(disabledLinks);
      //Save to database
      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          links: JSON.stringify(links),
        };
      });
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen py-10">
        <main className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-2">
            <NavigationTabs />
            <Link
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white/70"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span>View Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 min-w-0">
              <Outlet />
            </div>

            {/* Phone Mockup Preview */}
            <div className="w-full lg:w-[340px] shrink-0">
              <div className="sticky top-24">
                <p className="text-xs font-medium uppercase tracking-widest text-white/30 mb-4 text-center">Live Preview</p>
                <div className="phone-mockup p-6 pt-8">
                  <div className="text-center space-y-5">
                    <p className="text-2xl font-extrabold gradient-text">{data.handle}</p>

                    {data.image && (
                      <div className="flex justify-center">
                        <img
                          src={data.image}
                          alt="Profile Picture"
                          className="w-24 h-24 rounded-2xl object-cover border border-white/10"
                        />
                      </div>
                    )}

                    {data.description && (
                      <p className="text-sm text-white/60 leading-relaxed px-2">
                        {data.description}
                      </p>
                    )}

                    <DndContext
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="flex flex-col gap-2.5 mt-4">
                        <SortableContext
                          items={enabledLinks}
                          strategy={verticalListSortingStrategy}
                        >
                          {enabledLinks.map((link) => (
                            <LinkHubLink key={link.name} link={link} />
                          ))}
                        </SortableContext>
                      </div>
                    </DndContext>

                    {enabledLinks.length === 0 && (
                      <p className="text-white/25 text-xs py-6">Enable links to see them here</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(15, 15, 35, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "white",
            backdropFilter: "blur(12px)",
          },
        }}
      />
    </>
  );
}
