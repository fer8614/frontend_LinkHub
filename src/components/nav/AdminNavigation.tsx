import { useQueryClient } from "@tanstack/react-query";

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
      className="gradient-button px-6 py-2 text-sm uppercase font-bold rounded-lg cursor-pointer hover:shadow-lg hover:shadow-purple-500/50"
      onClick={logOut}
    >
      Log Out
    </button>
    );
}