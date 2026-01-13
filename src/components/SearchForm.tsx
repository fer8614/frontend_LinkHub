
import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import ErrorMessage from "./errorMessage";
import { searchUserByHandle } from "../api/LinkHubApi";
import { Link } from "react-router-dom";

export default function SearchForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
      defaultValues: {
        handle: ""
      }
    });

    const handle = watch("handle");

    const mutation = useMutation({
      mutationFn: searchUserByHandle
    });

    const handleSearch = () => {
      const slug = slugify(handle);
      mutation.mutate(slug);
    };

    return (
        <form
        onSubmit={handleSubmit(handleSearch)}
        className="space-y-5">
        <div className="relative flex items-center card-modern px-0 overflow-hidden">
          <label
            htmlFor="handle"
            className="px-4 py-3 text-white/70 font-semibold whitespace-nowrap text-sm"
          >linkhub.app/</label>
          <input
            type="text"
            id="handle"
            className="border-none bg-transparent px-2 py-3 focus:ring-0 flex-1 text-white placeholder-white/50 focus:outline-none"
            placeholder="elonmusk, zuck, jeffbezos"
            {...register("handle", {
              required: "Username is required",
            })}
          />
        </div>
        {errors.handle && (
          <ErrorMessage>{errors.handle.message}</ErrorMessage>
        )}
      
        <div className="mt-8 space-y-4">
          {mutation.isPending && <div className="loading-container fixed inset-0 flex items-center justify-center">
            <ClipLoader color="#a855f7" loading={true} size={50} />
          </div>}
          {mutation.error && <p className="text-center text-red-400 font-bold bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">{mutation.error.message}</p>}
          {mutation.data && (
            <div className="text-center space-y-3">
              <p className="gradient-text font-bold text-lg">{mutation.data}</p>
              <Link to={"/auth/register"} className="gradient-button inline-block px-6 py-2 rounded-lg" state={{ handle: slugify(handle) }}>
                Create Account
              </Link>
            </div>
          )}
        </div>
      
        <input
          type="submit"
          className="gradient-button w-full py-3 text-lg uppercase tracking-wider font-bold"
          value='Get my LinkHub'
        />
      </form>
    );
}