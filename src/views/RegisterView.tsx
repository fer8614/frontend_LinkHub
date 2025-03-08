import { Link } from "react-router-dom";

export default function RegisterView() {
  return (
    <>
      <div className="text-6xl font-bold">RegisterView</div>;
      <nav>
        <Link to="/auth/login">Already have an account? Sign in</Link>
      </nav>
    </>
  );
}
