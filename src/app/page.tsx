import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen mx-auto w-full">
      <div className="text-center">
        <h1>This is My NextJS App</h1>
        <Image src="/next.svg" alt="Next.js logo" width={180} height={40} />
      </div>
    </div>
  );
}
