// fetching private data (user logged in)
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getPrivateRepos } from "./../../lib/github";

export default function RecapPage() {
  const { data: session, status } = useSession();
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPrivateRepos() {
      setIsLoading(true);

      try {
        const data = await getPrivateRepos();
        setRepos(data);
      } catch (error: string) {
        setError(error.response?.data?.error || error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated") {
      loadPrivateRepos();
    }
  }, [status]);

  if (status === "unauthenticated")
    return <p>Please sign in to view detailed recap info.</p>;

  if (isLoading) return <p>Loading private repositories…</p>;

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Private GitHub Recap</h1>

      {repos.length === 0 && (
        <p className="text-gray-600">
          No private or collaborative repos found.
        </p>
      )}

      <ul className="space-y-2">
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