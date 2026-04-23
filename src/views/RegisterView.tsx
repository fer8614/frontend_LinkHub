import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, AtSign, ArrowRight } from "lucide-react";
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
      <div className="text-center lg:text-left mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text mb-3">Join LinkHub</h1>
        <p className="text-white/50 text-base">Create your account and start sharing</p>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="card-modern space-y-4"
      >
        <div className="space-y-1.5">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="input-modern w-full pl-10"
              {...register("name", { required: "Name is required" })}
            />
          </div>
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="input-modern w-full pl-10"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="handle" className="form-label">
            Username
          </label>
          <div className="relative">
            <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              id="handle"
              type="text"
              placeholder="johndoe (no spaces)"
              className="input-modern w-full pl-10"
              {...register("handle", { required: "Handle is required" })}
            />
          </div>
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              id="password"
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-modern w-full pl-10 pr-12"
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
              className="absolute inset-y-0 right-0 pr-3.5 text-white/30 hover:text-white/60"
            >
              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password_confirmation" className="form-label">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              id="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-modern w-full pl-10 pr-12"
              {...register("password_confirmation", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 text-white/30 hover:text-white/60"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="gradient-button w-full py-3 text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
        >
          <span>Create Account</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <nav className="mt-8 text-center">
        <p className="text-white/40 text-sm mb-2">Already have an account?</p>
        <Link className="gradient-text font-semibold text-base hover:opacity-80" to="/auth/login">
          Sign in here
        </Link>
      </nav>
    </>
  );
}
