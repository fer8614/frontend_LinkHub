import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import ErrorMessage from "../components/errorMessage";
import { LoginFormProps } from "../types";
import api from "../config/axios";
import { isAxiosError } from "axios";
import { useState } from "react";

export default function LoginView() {
  const navigate = useNavigate();
  const initialValues: LoginFormProps = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const handleLogin = async (formData: LoginFormProps) => {
    try {
      const { data } = await api.post(`/auth/login`, formData);
      localStorage.setItem("AUTH_TOKEN_LH", data);
      navigate("/admin");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  return (
    <>
      <div className="text-center lg:text-left mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text mb-3">Welcome Back</h1>
        <p className="text-white/50 text-base">Sign in to your LinkHub account</p>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="card-modern space-y-5"
        noValidate
      >
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
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
          </div>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              id="password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-modern w-full pl-10 pr-12"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 text-white/30 hover:text-white/60"
            >
              {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="gradient-button w-full py-3 text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
        >
          <span>Sign In</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <nav className="mt-8 text-center">
        <p className="text-white/40 text-sm mb-2">Don't have an account?</p>
        <Link
          className="gradient-text font-semibold text-base hover:opacity-80"
          to="/auth/register"
        >
          Create one here
        </Link>
      </nav>
    </>
  );
}
