import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SocialNetwork } from "../types";

type LinkHubLinkProps = {
  link: SocialNetwork;
};

export default function LinkHubLink({ link }: LinkHubLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: link.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <>
      <li 
        style={style}
        className="link-card group"
        {...attributes}
        {...listeners}
        ref={setNodeRef}
      >
        <div
          className="social-link-icon group-hover:scale-110"
          style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
        ></div>
        <div className="flex-1">
          <p className="text-white/80 text-sm uppercase tracking-wider">Visit My</p>
          <p className="capitalize text-white font-bold text-lg">{link.name}</p>
        </div>
        <div className="text-white/40 group-hover:text-white/60 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </li>
    </>
  );
}
