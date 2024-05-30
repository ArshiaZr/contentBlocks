import React from "react";
import { useClerk } from "@clerk/clerk-react";

export default function Dashboard() {
  // Clerk's signOut hook
  const { signOut } = useClerk();

  // handle logout
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <main className="background">
      <div className="max-w-lg mx-auto p-8 text-center ">
        <div className="title-class">Dashboard</div>
        <div className="text-white text-lg mt-4">
          This is a protected route. You can only see this if you are logged in.
        </div>
        <div className="mt-8">
          <button
            type="button"
            onClick={handleLogout}
            className="text-white text-lg bg-purple-500 p-2 rounded-md hover:bg-purple-400 pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
