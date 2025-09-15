"use client";

export default function Landing() {
  async function handleGithubLogin() {
    console.log("Button clicked!");
  }

  return (
    <section className="flex items-center justify-center w-10/12 mx-auto">
      <button
        className="dark:bg-gray-700 text-center text-white p-4 cursor-pointer"
        onClick={handleGithubLogin}
      >
        Login with GitHub
      </button>
    </section>
  );
}
