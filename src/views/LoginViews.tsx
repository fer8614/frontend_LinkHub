import { Link } from "react-router-dom";

export default function LoginView() {
  return (
    <>
      <nav>
        <Link to="/auth/register">Don't have an account? Create one here</Link>
      </nav>
    </>
  );
}
