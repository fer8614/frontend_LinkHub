
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
        <div className="relative flex items-center  bg-white  px-2">
          <label
            htmlFor="handle"
          >linkhub.com/</label>
          <input
            type="text"
            id="handle"
            className="border-none bg-transparent p-2 focus:ring-0 flex-1"
            placeholder="elonmusk, zuck, jeffbezos"
            {...register("handle", {
              required: "Username is required",
            })}
          />
      
        </div>
        {errors.handle && (
          <ErrorMessage>{errors.handle.message}</ErrorMessage>
        )}
      
        <div className="mt-10">
          {mutation.isPending && <div className="loading-container fixed inset-0 flex items-center justify-center">
            <ClipLoader color="#36D7B7" loading={true} size={50} />
          </div>}
          {mutation.error && <p className="text-center text-red-600 font-black">{mutation.error.message}</p>}
          {mutation.data && <p className="text-center text-cyan-500 font-black">{mutation.data} go to <Link to={"/auth/register"} className="text-cyan-600 hover:underline">Register</Link></p>}
        </div>
      
        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value='Get my LinkHub'
        />
      </form>
    );
}