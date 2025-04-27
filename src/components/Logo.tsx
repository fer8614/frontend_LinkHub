import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to={"/"}>
            <img src="/logo.png" className="w-full block" alt="Logo LinkHub" />
        </Link>
    );
}