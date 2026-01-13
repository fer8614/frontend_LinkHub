import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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
      <h1 className="text-5xl font-black gradient-text mb-2">Welcome Back</h1>
      <p className="text-white/60 text-lg mb-10">Sign in to your LinkHub account</p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="card-modern space-y-6 mt-8"
        noValidate
      >
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
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-2">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-modern"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-4 text-white/50 hover:text-white transition-colors"
            >
              <FontAwesomeIcon
                icon={showCurrentPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="gradient-button w-full py-3 text-lg uppercase tracking-wider"
          value="Sign In"
        />
      </form>

      <nav className="mt-8 text-center">
        <p className="text-white/60 mb-3">Don't have an account?</p>
        <Link
          className="gradient-text font-bold text-lg hover:opacity-80 transition-opacity"
          to="/auth/register"
        >
          Create one here
        </Link>
      </nav>
    </>
  );
}
