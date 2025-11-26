"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface GithubProfile {
  name: string;
  followers: number;
  public_repos: number;
  following: number;
  avatar_url: string;
  login: string;
}

export default function PublicRecap({ username }: { username: string }) {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function loadProfile() {
      setError(null);
      setProfile(null);
      setIsLoading(true);

      try {
        // call api route
        const res = await axios.get("/api/github/public", {
          params: { username },
          signal: signal,
        });

        setProfile(res.data);
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log("Fetch request cancelled by cleanup.");
        } else {
          setError(err.response?.data?.error || err.message);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    if (username) {
      loadProfile();
    } else {
      setIsLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [username]);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="mx-auto max-w-md w-full p-6 bg-slate-800 rounded-xl shadow-2xl">
        <Image
          src={profile.avatar_url}
          alt="Avatar"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl text-center font-bold text-pink-800 mb-4 border-b pb-2">
          {profile.name || profile.login}'s GitHub Recap
        </h1>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p className="text-gray-300">
            <span className="font-semibold text-indigo-500">Following:</span>{" "}
            {profile.following.toLocaleString()}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-indigo-500">Followers:</span>{" "}
            {profile.followers.toLocaleString()}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-indigo-500">
              Public Repositories:
            </span>{" "}
            {profile.public_repos}
          </p>
        </div>
      </div>
    </div>
  );
}
