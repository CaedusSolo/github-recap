"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface GithubProfile {
  name: string;
  followers: number;
  public_repos: number;
  login: string;
}

export default function PublicRecap({ username }: { username: string }) {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 1. Create an AbortController for cleanup
    const controller = new AbortController();
    const signal = controller.signal;

    async function loadProfile() {
      // Reset state and set loading flag
      setError(null);
      setProfile(null);
      setIsLoading(true);

      try {
        const res = await axios.get("/api/github/public", {
          params: { username },
          // 2. Pass the signal to cancel the request
          signal: signal,
        });

        setProfile(res.data);
      } catch (err: any) {
        // 3. Ignore cancellation errors (they are expected on cleanup)
        if (axios.isCancel(err)) {
          console.log("Fetch request cancelled by cleanup.");
        } else {
          setError(err.response?.data?.error || err.message);
        }
      } finally {
        // Only stop loading if the request wasn't cancelled
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    // Call conditionally only if username is present
    if (username) {
      loadProfile();
    } else {
      setIsLoading(false);
    }

    // 4. Return the cleanup function
    return () => {
      // Abort any pending request when dependencies change or component unmounts
      controller.abort();
    };
  }, [username]);

  // UI rendering based on state
  if (error)
    return (
      <p className="text-xl p-4 text-center text-red-500 font-medium bg-red-50 rounded-lg shadow-sm">
        Error: {error}
      </p>
    );
  if (isLoading || !profile)
    return (
      <p className="text-xl p-4 text-center text-blue-600">
        Loading profile for **{username}**...
      </p>
    );

  return (
    <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
        {profile.name || profile.login}'s GitHub Recap
      </h1>
      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <p>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            Followers:
          </span>{" "}
          {profile.followers.toLocaleString()}
        </p>
        <p>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            Public Repositories:
          </span>{" "}
          {profile.public_repos}
        </p>
      </div>
    </div>
  );
}
