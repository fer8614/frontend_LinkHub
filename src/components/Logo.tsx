import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to={"/"} className="inline-block hover:opacity-80 transition-opacity">
            <img src="/logo.png" className="w-40 block" alt="Logo LinkHub" />
        </Link>
    );
}