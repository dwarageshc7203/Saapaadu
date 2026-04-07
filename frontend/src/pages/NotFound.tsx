import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sand px-6 text-center text-ink">
      <div className="rounded-3xl border border-ink/10 bg-white p-10 shadow-xl shadow-amber-100/60">
        <h1 className="text-5xl font-semibold">404</h1>
        <p className="mt-3 text-ink/60">Oops! Page not found.</p>
        <Link to="/" className="btn btn-primary mt-6 inline-flex">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
