import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ChangeEvent } from "react";
import { AtSign, FileText, ImagePlus, Save } from "lucide-react";
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
      className="card-modern space-y-6"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl font-extrabold gradient-text mb-2">
        Edit Your Profile
      </legend>

      <div className="space-y-1.5">
        <label htmlFor="handle" className="form-label">Handle / Username</label>
        <div className="relative">
          <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
          <input
            type="text"
            className="input-modern w-full pl-10"
            placeholder="your_username"
            {...register("handle", {
              required: "Handle or Username is required",
            })}
          />
        </div>
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="description" className="form-label">Bio / Description</label>
        <div className="relative">
          <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30 pointer-events-none" />
          <textarea
            className="input-modern w-full resize-none h-24 pl-10"
            placeholder="Tell people about yourself..."
            {...register("description", {
              required: "Description is required",
            })}
          />
        </div>
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="image" className="form-label">Profile Picture</label>
        <div className="relative">
          <div className="flex items-center gap-3 input-modern cursor-pointer">
            <ImagePlus className="w-5 h-5 text-white/30 shrink-0" />
            <input
              id="image"
              type="file"
              name="image"
              className="w-full text-sm text-white/60 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30 cursor-pointer"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="gradient-button w-full py-3 text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
      >
        <Save className="w-4 h-4" />
        <span>Save Changes</span>
      </button>
    </form>
  );
}
