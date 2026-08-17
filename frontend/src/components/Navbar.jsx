import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-center">
      {/* Rule 4 (Edge Safe Zone) */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="font-heading text-2xl font-bold leading-tight text-primary">
          Traktir Kopi
        </Link>
        <Link
          to="/donate"
          className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-white hover:opacity-90">
          Traktir Sekarang
        </Link>
      </div>
    </nav>
  );
}
