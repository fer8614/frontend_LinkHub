import { Link } from "react-router-dom";

export default function RegisterView() {
  return (
    <>
      <nav>
        <Link to="/auth/login">Already have an account? Sign in</Link>
      </nav>
    </>
  );
}
