import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { getUserByHandle } from "../api/LinkHubApi";
import HandleData from "../components/HandleData";

export default function HandleView() {
  const params = useParams();
  const handle = params.handle!;
  const { data, isLoading, error } = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ["handle", handle],
    retry: 1,
  });

  if (isLoading) 
    return (
      <div className="loading-container fixed inset-0 flex items-center justify-center">
        <ClipLoader color="#36D7B7" loading={true} size={50} />
      </div>
    );
  if (error) {
    return <Navigate to="/404" />;
  }

  if (data) return <HandleData data={data} />;
}