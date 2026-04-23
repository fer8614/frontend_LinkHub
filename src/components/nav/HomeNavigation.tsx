import { Link } from "react-router-dom";

export default function HomeNavigation() {
    return (
        <div className="flex items-center gap-2">
            <Link to="/auth/login" className="px-5 py-2 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/[0.06]">
                Sign In
            </Link>
            <Link to="/auth/register" className="gradient-button px-5 py-2 text-sm font-semibold rounded-lg">
                <span>Get Started</span>
            </Link>
        </div>
    );
}