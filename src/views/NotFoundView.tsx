import { Link } from "react-router-dom";
import { SearchX, ArrowLeft } from "lucide-react";

export default function NotFoundView() {
  return (
    <div className="text-center py-16 space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
          <SearchX className="w-9 h-9 text-white/20" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">User Not Found</h1>
        <p className="text-white/40 text-sm max-w-sm mx-auto">
          The profile you're looking for doesn't exist or may have been removed.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to home</span>
      </Link>
    </div>
  );
}