"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed inset-x-0 p-4 z-50 top-0 dark:bg-black backdrop-blur-md">
      <div className="flex justify-between items-center px-10">
        <img src="transparent-logo.png" alt="Logo" className="h-22" />
        {session ? (
          <>
            <p>Signed in as {session.user?.name}</p>
            <button
              onClick={() => signOut()}
              className="text-gray-300 hover:text-white transition cursor-pointer"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="text-gray-300 hover:text-white transition cursor-pointer"
          >
            Login with GitHub
          </button>
        )}
      </div>
    </nav>
  );
}
