"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Landing() {
  async function handleGithubLogin() {
    signIn("github");
  }

  return (
    <section className="flex flex-col items-center justify-center gap-y-10 w-10/12 mx-auto ">
      <div className="flex w-full max-w-lg">
        <input
          type="text"
          placeholder="Your GitHub Username (e.g. awesomekling)"
          className="flex-1 rounded-l-md border px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500"
        />
        <button
          type="button"
          className="rounded-r-md bg-black px-6 py-2 text-white font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          Unwrap
        </button>
      </div>
      <button
        className="dark:bg-gray-700 text-center text-white p-4 cursor-pointer"
        onClick={handleGithubLogin}
      >
        Login with GitHub
      </button>
    </section>
  );
}
