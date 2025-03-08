import { Link } from "react-router-dom";

export default function LoginView() {
  return (
    <>
      <div className="text-6xl font-bold">LoginView</div>;
      <nav>
        <Link to="/auth/register">Don't have an account? Create one here</Link>
      </nav>
    </>
  );
}
