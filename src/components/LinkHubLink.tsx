import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
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
    <li 
      style={style}
      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.06] group cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      <GripVertical className="w-3.5 h-3.5 text-white/15 shrink-0" />
      <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
        <img src={`/social/icon_${link.name}.svg`} alt={link.name} className="w-4 h-4" />
      </div>
      <p className="capitalize text-white/80 font-medium text-xs flex-1 min-w-0 truncate">{link.name}</p>
    </li>
  );
}
