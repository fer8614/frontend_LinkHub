import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { getUser } from "../api/LinkHubApi";
import LinkHub from "../components/LinkHub";

export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="loading-container fixed inset-0 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  if (data) return <LinkHub data={data} />;
}
