import { Link } from "react-router-dom";

export default function HomeNavigation() {
    return (
        <div className="flex gap-3">
            <Link to="/auth/login" className="nav-link px-4 py-2 text-sm uppercase font-bold">
                Sign In
            </Link>
            <Link to="/auth/register" className="gradient-button px-6 py-2 text-sm uppercase font-bold rounded-lg">
                Get Started
            </Link>
        </div>
    );
}