import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Search, ArrowRight } from "lucide-react";
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
        className="card-modern space-y-5 w-full">
        <div className="space-y-1">
          <p className="text-sm font-medium text-white/50 mb-3">Claim your username</p>
          <div className="relative flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden focus-within:border-purple-500/40 focus-within:shadow-[0_0_0_3px_rgba(139,92,246,0.12)]">
            <Search className="w-4 h-4 text-white/30 ml-4 shrink-0" />
            <span className="text-white/40 text-sm font-medium pl-2 whitespace-nowrap">linkhub.app/</span>
            <input
              type="text"
              id="handle"
              className="border-none bg-transparent px-2 py-3 focus:ring-0 flex-1 text-white placeholder-white/30 focus:outline-none text-sm"
              placeholder="your-username"
              {...register("handle", {
                required: "Username is required",
              })}
            />
          </div>
        </div>
        {errors.handle && (
          <ErrorMessage>{errors.handle.message}</ErrorMessage>
        )}
      
        <div className="space-y-3">
          {mutation.isPending && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
            </div>
          )}
          {mutation.error && (
            <p className="text-center text-sm text-red-300 bg-red-500/8 border border-red-500/15 rounded-lg px-4 py-3">
              {mutation.error.message}
            </p>
          )}
          {mutation.data && (
            <div className="text-center space-y-3 py-2">
              <p className="gradient-text font-semibold text-sm">{mutation.data}</p>
              <Link
                to="/auth/register"
                className="gradient-button inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg"
                state={{ handle: slugify(handle) }}
              >
                <span>Create Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      
        <button
          type="submit"
          className="gradient-button w-full py-3 text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
        >
          <span>Get my LinkHub</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    );
}