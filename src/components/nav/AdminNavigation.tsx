import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

export default function AdminNavigation() {

  const queryClient = useQueryClient();
  const logOut = () => {
    localStorage.removeItem("AUTH_TOKEN_LH");
    queryClient.invalidateQueries({
      queryKey: ["user"],
    });
  };

  return (
    <button
      className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] rounded-lg cursor-pointer"
      onClick={logOut}
    >
      <LogOut className="w-4 h-4" />
      <span>Log Out</span>
    </button>
    );
}