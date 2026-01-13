import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
  const handle = location.state?.handle;
  const initialValues = {
    name: "",
    email: "",
    handle: handle || "",
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
      navigate("/auth/login");
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
      <h1 className="text-5xl font-black gradient-text mb-2">Join LinkHub</h1>
      <p className="text-white/60 text-lg mb-10">Create your account and start sharing</p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="card-modern space-y-5 mt-8"
      >
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="input-modern"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="input-modern"
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
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="handle" className="form-label">
            Username
          </label>
          <input
            id="handle"
            type="text"
            placeholder="johndoe (no spaces)"
            className="input-modern"
            {...register("handle", { required: "Handle is required" })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-modern"
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
              className="absolute inset-y-0 right-0 pr-4 text-white/50 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-2">
          <label
            htmlFor="password_confirmation"
            className="form-label"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-modern"
              {...register("password_confirmation", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-4 text-white/50 hover:text-white transition-colors"
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
          className="gradient-button w-full py-3 text-lg uppercase tracking-wider mt-6"
          value="Create Account"
        />
      </form>

      <nav className="mt-8 text-center">
        <p className="text-white/60 mb-3">Already have an account?</p>
        <Link className="gradient-text font-bold text-lg hover:opacity-80 transition-opacity" to="/auth/login">
          Sign in here
        </Link>
      </nav>
    </>
  );
}
