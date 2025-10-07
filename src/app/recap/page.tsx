"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getProfile } from "./../../lib/github";

export default function RecapPage() {
  const { data: session, status } = useSession();
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    async function fetchRepos() {
      if (!session?.accessToken) return;

      const res = await fetch("https://api.github.com/user/repos", {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      const data = await res.json();
      setRepos(data);
    }

    if (status === "authenticated") fetchRepos();
  }, [status, session]);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Repos</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
