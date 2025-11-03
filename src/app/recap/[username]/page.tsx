// fetch public data (not authenticated)
"use client";
import PublicRecap from "@/components/recap/PublicRecap";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  return <PublicRecap username={username} />;
}
