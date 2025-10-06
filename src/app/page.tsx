"use client";
import Image from "next/image";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Landing from "../components/ui/Landing";
import RecapPage from "./recap/page";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
      <Navbar />
      <main className="min-h-screen dark:bg-gray-900 flex flex-col w-full items-center justify-center mx-auto">
        {session ? <RecapPage /> : <Landing />}
      </main>
      <Footer />
    </>
  );
}
