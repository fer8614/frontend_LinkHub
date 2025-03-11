import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { RegisterFormProps } from "../types";
import ErrorMessage from "../components/errorMessage";
import api from "../config/axios";

export default function RegisterView() {
  const initialValues = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({ defaultValues: initialValues });

  const password = watch("password");

  const handleRegister = async (formData: RegisterFormProps) => {
    try {
      const { data } = await api.post(`/auth/register`, formData);
      toast.success(data);
      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Create Account</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Registration Email"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Username: no spaces"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("handle", { required: "Handle is required" })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Registration Password"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400 w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 p-3"
            >
              <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repeat Password
          </label>
          <div className="relative">
            <input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat Password"
              className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400 w-full"
              {...register("password_confirmation", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 p-3"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Create Account"
        />
      </form>

      <nav className="mt-10">
        <Link className="text-center text-white text-lg block" to="/auth/login">
          Already have an account? Sign in
        </Link>
      </nav>
    </>
  );
}
