import Image from "next/image";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Landing from "../components/ui/Landing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen dark:bg-gray-900 flex flex-col w-full items-center justify-center mx-auto">
        <Landing />
      </main>
      <Footer />
    </>
  );
}