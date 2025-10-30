"use client";
import PublicRecap from "@/components/recap/PublicRecap";

export default function Page({ params }: { params: { username: string } }) {
  return <PublicRecap username={params.username} />;
}
