import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="background">
      <div className="max-w-lg mx-auto p-8 text-center ">
        <div className="title-class">404 Not Found</div>
        <div className="text-white text-lg mt-4">
          The page you are looking for does not exist.
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="text-white text-lg bg-purple-500 p-2 rounded-md hover:bg-purple-400 pointer"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
