import Image from "next/image";
import Navbar from "../components/ui/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen dark:bg-gray-900 flex flex-col w-full items-center justify-center mx-auto">
        Hello
      </main>
    </>
  );
}
