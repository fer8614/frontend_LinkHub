import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 py-10">
        <main className="mx-auto max-w-6xl px-4 md:px-0">
          <NavigationTabs />

          <div className="flex justify-end mb-8">
            <Link
              className="gradient-text font-bold text-lg hover:opacity-80 transition-opacity flex items-center gap-2"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span>Visit My Profile</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <Outlet />
            </div>
            <div className="w-full lg:w-96 profile-card sticky top-24">
              <div className="text-center space-y-6">
                <p className="text-4xl font-black gradient-text">{data.handle}</p>

                {data.image && (
                  <div className="flex justify-center">
                    <img
                      src={data.image}
                      alt="Profile Picture"
                      className="w-48 h-48 rounded-2xl object-cover border-2 border-white/20 hover:border-white/40 transition-colors"
                    />
                  </div>
                )}
                <p className="text-center text-lg font-semibold text-white/90 leading-relaxed">
                  {data.description}
                </p>

                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <div className="mt-8 flex flex-col gap-4">
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
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
