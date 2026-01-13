import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChangeEvent } from "react";
import ErrorMessage from "../components/errorMessage";
import { ProfileFormProps, User } from "../types";
import { updateProfile, uploadImage } from "../api/LinkHubApi";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormProps>({
    defaultValues: { handle: data.handle, description: data.description },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (dataMessage) => {
      toast.success(dataMessage);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          prevData: data,
        };
      });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          image: data,
        };
      });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };
  const handleUserProfileForm = (formData: ProfileFormProps) => {
    const user: User = queryClient.getQueryData(["user"])!;
    user.description = formData.description;
    user.handle = formData.handle;

    updateProfileMutation.mutate(user);
  };

  return (
    <form
      className="card-modern-dark space-y-6"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-3xl font-black gradient-text text-center mb-8">
        Edit Your Profile
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle" className="form-label">Handle / Username</label>
        <input
          type="text"
          className="input-modern"
          placeholder="your_username"
          {...register("handle", {
            required: "Handle or Username is required",
          })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description" className="form-label">Bio / Description</label>
        <textarea
          className="input-modern resize-none h-24"
          placeholder="Tell people about yourself..."
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="image" className="form-label">Profile Picture</label>
        <div className="relative">
          <input
            id="image"
            type="file"
            name="image"
            className="input-modern cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white hover:file:from-purple-600 hover:file:to-pink-600"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
      </div>

      <input
        type="submit"
        className="gradient-button w-full py-3 text-lg uppercase tracking-wider mt-8"
        value="Save Changes"
      />
    </form>
  );
}
