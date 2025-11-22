"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import the router for client-side navigation

export default function Landing() {
  const router = useRouter();
  const [usernameInput, setUsernameInput] = useState("");

  async function handleGithubLogin() {
    signIn("github");
  }

  async function handleUnwrap() {
    const trimmedUsername = usernameInput.trim();
    if (trimmedUsername) {
      router.push(`/recap/${trimmedUsername}`);
    }
  }

  const isInputValid = usernameInput.trim().length > 0;

  return (
    <section className="flex flex-col items-center justify-center gap-y-10 w-10/12 mx-auto">
      <div className="flex w-full max-w-lg shadow-lg rounded-md">
        <input
          type="text"
          placeholder="Your GitHub Username (e.g. awesomekling)"
          className="flex-1 rounded-l-md border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          // Allow submitting by pressing Enter key
          onKeyPress={(e) => {
            if (e.key === "Enter" && isInputValid) {
              handleUnwrap();
            }
          }}
        />
        <button
          type="button"
          className={`rounded-r-md px-6 py-3 font-semibold transition duration-150 
            ${
              isInputValid
                ? "bg-purple-600 text-white cursor-pointer hover:bg-purple-700 focus:ring-purple-500"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            } focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-gray-900`}
          onClick={handleUnwrap}
          disabled={!isInputValid}
        >
          Unwrap
        </button>
      </div>

      <button
        className="dark:bg-gray-700 text-center text-white p-4 cursor-pointer rounded-lg shadow-md hover:bg-gray-600 transition duration-150 ease-in-out font-medium tracking-wide w-full max-w-lg"
        onClick={handleGithubLogin}
      >
        Login with GitHub
      </button>
    </section>
  );
}
