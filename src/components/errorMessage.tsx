import { ErrorMessageProps } from "../types";

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p className="error-message text-center">
      {children}
    </p>
  );
}
